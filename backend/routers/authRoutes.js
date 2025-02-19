import express from "express";
import { Users } from "../models/User.js";
import bcrypt from "bcrypt";

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
            instagram: instagram || "",
            profilepicture: profilepicture || ""
        });
        return response.status(200).send({
            message : "User Account Created Successfully."
        });
    }catch(err){
        return response.status(500).send({
            error : `Internal Server Error : ${err.message}`
        });
    }
});

authRouter.get("/allusers", async (request, response)=>{
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
