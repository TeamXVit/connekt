import express from "express";
import authenticateToken from "../middleware/authMiddleware.js";
import { Users } from "../models/User.js";
import { v2 as cloudinary} from "cloudinary";
import { Travel } from "../models/Travel.js"; 
import "dotenv/config";

cloudinary.config({secure:true});
const profileRouter = express.Router();

profileRouter.post("/upload-profilepicture", authenticateToken, async (request, response)=>{
    try{
        const { regno } = request.user;
        const { image } = request.body;
        if(!image) return response.status(400).send({
            error: "Image is Required"
        });
        if(!image.startsWith("data:image")) return response.status(400).send({
            error: "Image should be in base64."
        });
        if(!image.startsWith("data:image/png;") && !image.startsWith("data:image/jpeg;")) return response.status(400).send({
            error: "Only JPG and PNG Images are allowed."
        });
        const user = await Users.findOne({regno});
        if(!user) return response.status(404).send({
            error: "User not Found"
        });
        const config = {
            public_id : regno,
            folder : "profile-pictures",
            unique_filename : false, 
            use_filename : true,
            resource_type: "image"
        };
        const result = await cloudinary.uploader.upload(image, config);
        user.profilepicture = result.secure_url;
        user.optprofilepicture = cloudinary.url(result.public_id,{
            secure: true,
            transformation:[
                {
                    crop:"crop",
                    gravity:"auto",
                    height:400,
                    width:400
                },
                {fetch_format:"auto"}
            ]
        });
        await user.save();
        return response.status(200).send({
            message: "Profile picture uploaded successfully.",
        });
    }catch(err){
        return response.status(500).send({
            error : `Internal Server Error : ${err.message}`
        });
    }
});

profileRouter.get("/view/:regno", authenticateToken, async (request, response)=>{
    try{
        const { regno } = request.params;
        const user = await Users.findOne({regno:regno.toUpperCase()});
        if(!user) return response.status(400).send({
            error: "User not Found"
        });
        const data = {
            name: user.name,
            regno: user.regno,
            gender: user.gender,
            profilepicture: user.profilepicture,
            email: user.email,
            instagram: user.instagram
        };
        return response.status(200).send(data);
    }catch(err){
        return response.status(500).send({
            error : `Internal Server Error : ${err.message}`
        });
    }
});

profileRouter.get("/view",authenticateToken, async (request, response)=>{
    try{
        const { regno } = request.user;
        const user = await Users.findOne({regno});
        if(!user) return response.status(404).send({
            error: "User not Found"
        });
        const data = {
            name: user.name,
            regno: user.regno,
            gender: user.gender,
            profilepicture: user.profilepicture,
            email: user.email,
            instagram: user.instagram,
            dob: user.dob,
            phoneno: user.phoneno
        };
        return response.status(200).send(data);
    }catch(err){
        return response.status(500).send({
            error : `Internal Server Error : ${err.message}`
        });
    }
})

profileRouter.patch("/edit",authenticateToken, async (request, response)=>{
    try{
        const { name, phoneno, instagram } = request.body;
        if (!name && !phoneno && !instagram) {
            return res.status(400).json({ error: "At least one field must be provided for update." });
        }
        const { regno } = request.user;
        const user = await Users.findOne({regno});
        if(!user) return response.status(404).send({
            error: "User not Found"
        });
        if(name) user.name = name;
        if(phoneno) user.phoneno = phoneno;
        if(instagram) user.instagram = instagram;
        await user.save();
        return response.status(200).send({
            message : "Profile edited successfully"
        }); 
    }catch(err){
        return response.status(500).send({
            error : `Internal Server Error : ${err.message}`
        });
    }
});

profileRouter.get("/mytravels",authenticateToken, async (request, response)=>{
    try{
        const { regno } = request.user;
        const user = await Users.findOne({regno}).populate({
            path:"author",
            select:"regno name optprofilepicture phoneno"
        }).lean();
        if(!user) return response.status(404).send({
            error:"User not found."
        });
        const posts = await Travel.find({author:user._id});
        return response.status(200).send(posts);
    }catch(err){
        return response.status(500).send({
            error : `Internal Server Error : ${err.message}`
        });
    }
});

export default profileRouter;