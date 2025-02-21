import express from "express";
import { Users } from "../models/User.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import authenticateToken from "../middleware/authMiddleware.js";

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const authRouter = express.Router();

authRouter.post("/signup", async (request, response)=>{
    try{
        const {name, regno, password, gender, email, phoneno, dob, instagram, profilepicture} = request.body;
        if (!name || !regno || !password || !gender || !email || !phoneno || !dob) {
            return response.status(400).send({ error: "All required fields must be filled." });
        }
        if(!email.includes("@vitapstudent.ac.in")){
            return response.status(400).send({
                error:"Invalid e-mail, only VIT-AP e-mail is allowed."
            });
        }
        if(!email.includes(regno.toLowerCase())){
            return response.status(400).send({
                error : "Registation number and e-mail missmatch."
            });
        }
        const isUserExists = await Users.exists({regno:regno.toUpperCase()});
        if(isUserExists){
            return response.status(400).send({
                error : "User already exists."
            });
        }
        const hashedPassword = await bcrypt.hash(password,10);
        await Users.create({
            name,
            regno: regno.toUpperCase(),
            password: hashedPassword,
            gender,
            email,
            phoneno,
            dob,
            isVerified: false,
            resetToken: null,
            instagram: instagram || "",
            profilepicture: profilepicture || ""
        });
        const token = jwt.sign({email},process.env.JWTKEY,{expiresIn:"1d"});
        const verificationLink = `${request.protocol}://${request.get("host")}/auth/verify/${token}`;
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Email Verification",
            html:`<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`
        });
        return response.status(200).send({
            message : "User Account Created Successfully and Verification e-mail sent."
        });
    }catch(err){
        return response.status(500).send({
            error : `Internal Server Error : ${err.message}`
        });
    }
});

authRouter.get("/verify/:token", async (request, response)=>{
    try{
        const {token} = request.params;
        const decoded = jwt.verify(token, process.env.JWTKEY);
        const user = await Users.findOne({ email: decoded.email });
        if (!user) return response.status(400).send({ 
            error: "Invalid token" 
        });
        user.isVerified = true;
        await user.save();
        return response.status(200).send({message:"Email Verified"});
    }catch(err){
        return response.status(500).send({error: "Invalid or expired token"});
    }
});

authRouter.post("/login", async (request, response)=>{
    try{
        const { regno, password } = request.body;
        if(!regno || !password) return response.status(400).send({ error: "All required fields must be filled." });
        const user = await Users.findOne({regno:regno.toUpperCase()});
        if(!user) return response.status(400).send({
            error: "Invalid Credentials."
        });
        const match = await bcrypt.compare(password, user.password);
        if(!match) return response.status(400).send({
            error: "Invalid Credentials."
        });
        if(!user.isVerified) return response.status(400).send({
            error: "Email not verified"
        });
        const token = jwt.sign({regno}, process.env.JWTKEY, {expiresIn: "7d"});
        return response.status(200).send({token});
    }catch(err){
        return response.status(500).send({
            error: `Internal Server Error : ${err.message}`
        });
    }
});

authRouter.post("/forget-password", async (request,response)=>{
    try{
        const {email} = request.body;
        if(!email) return response.status(400).send({ 
            error: "Email is required." 
        });
        const user = await Users.findOne({email});
        if(!user) return response.status(400).send({
            error: "User Account doesn't exists"
        });
        if(user.resetToken){
            try {
                jwt.verify(user.resetToken, process.env.JWTKEY);
                return response.status(400).send({ error: "Multiple password reset attempts." });
            } catch (err) {
                user.resetToken = null;
                await user.save();
            }
        }
        const resetToken = jwt.sign({regno: user.regno}, process.env.JWTKEY, {expiresIn: "15m"});
        user.resetToken = resetToken;
        await user.save()
        const resetLink = `${request.protocol}://${request.get("host")}/auth/reset-password/${resetToken}`;
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Password Reset",
            html:`<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
        });
        return response.status(200).send({
            message: "Password reset email sent successfully."
        });
    }catch(err){
        return response.status(500).send({
            error: `Internal Server Error : ${err.message}`
        });
    }
});

authRouter.get("/reset-password/:token", async (request,response)=>{
    try{
        const { token } = request.params;
        return response.send(`
            <form action="/auth/reset-password" method="POST">
                <input type="hidden" name="token" value="${token}"/>
                <input type="password" name="password" value="" placeholder="Enter your new password"/>
                <input type="submit" value="Reset Password"/>
            </form>
        `);
    }catch(err){
        return response.status(500).send({
            error: `Internal Server Error : ${err.message}`
        });
    }
});

authRouter.post("/reset-password", async (request,response)=>{
    try{
        const { token,password } = request.body;
        if(!password?.trim()) return response.status(400).send({
            error: "New Password is Required."
        });
        let decoded;
        try{
            decoded = jwt.verify(token, process.env.JWTKEY); 
        }catch(err){
            return response.status(400).send({
                error: "Invalid or expired token."
            });
        }
        const user = await Users.findOne({regno:decoded.regno});
        if(!user) return response.status(400).send({
            error: "User not found."
        });
        if(user.resetToken!==token) return response.status(400).send({
            error: "Invalid or expired token."
        });
        const hashedPassword = await bcrypt.hash(password,10);
        user.password = hashedPassword;
        user.resetToken = null;
        await user.save();
        return response.status(200).send({
            message: "Your password has been successfully changed."
        });
    }catch(err){
        return response.status(500).send({
            error: `Internal Server Error : ${err.message}`
        });
    }
});   

authRouter.get("/allusers", authenticateToken, async (request, response)=>{
    try{
        const data = await Users.find();
        response.status(200).send(data);
    }catch(err){
        response.status(500).send({
            error: `Internal Server Error : ${err.message}`
        });
    }
})

export default authRouter;