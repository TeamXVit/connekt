import express from "express";
import authenticateToken from "../middleware/authMiddleware.js";
import { Users } from "../models/User.js";
import { Travel } from "../models/Travel.js";
import { TeamMate } from "../models/TeamMate.js";
import { Queries } from "../models/Queries.js";
import { v2 as cloudinary} from "cloudinary";
import "dotenv/config";
import multer from "multer";

cloudinary.config({secure:true});
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 } 
});
const profileRouter = express.Router();

profileRouter.post(
    "/upload-profilepicture",
    authenticateToken, 
    upload.single("image"), 
    async (request, response)=>{
    try{
        const { regno } = request.user;
        if(!request.file) return response.status(400).send({
            error: "Image is Required"
        });
        if(!["image/jpeg", "image/png"].includes(request.file.mimetype)) return response.status(400).send({
            error: "Only JPG and PNG files are allowed."
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
            resource_type: "image",
            invalidate: true,
            overwrite: true
        };
        const b64 = Buffer.from(request.file.buffer).toString("base64");
        const dataURI = `data:${request.file.mimetype};base64,${b64}`;
        const result = await cloudinary.uploader.upload(dataURI, config);
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
            profilepicture: user.profilepicture,
            optprofilepicture: user.optprofilepicture
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
            optprofilepicture: user.optprofilepicture,
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
        const user = await Users.findOne({regno});
        if(!user) return response.status(404).send({
            error:"User not found."
        });
        const posts = await Travel.find({author:user._id}).populate({
            path:"author",
            select:"regno name optprofilepicture phoneno"
        }).lean();
        const tagedPosts = posts.map(post=>({...post,tag:"Travel Partner"}));
        return response.status(200).send(tagedPosts);
    }catch(err){
        return response.status(500).send({
            error : `Internal Server Error : ${err.message}`
        });
    }
});

profileRouter.get("/mytravels/mycomments",authenticateToken, async (request, response)=>{
    try{
        const { regno } = request.user;
        const user = await Users.findOne({regno});
        if(!user) return response.status(404).send({
            error:"User not found."
        });
        const posts = await Travel.find({"comments.userID":user._id})
        .populate("author","regno name optprofilepicture")
        .populate("comments.userID","regno name")
        .lean();
        const tagedPosts = posts.map(post=>({...post,tag:"Travel Partner"}));
        const filteredPosts = tagedPosts.map(post=>(
            {...post,
                comments: post.comments.filter(comment=>comment.userID._id.toString()===user._id.toString())
            }
        ));
        return response.status(200).send(filteredPosts);
    }catch(err){
        return response.status(500).send({
            error : `Internal Server Error : ${err.message}`
        });
    }
});

profileRouter.get("/myteammates",authenticateToken, async (request, response)=>{
    try{
        const { regno } = request.user;
        const user = await Users.findOne({regno});
        if(!user) return response.status(404).send({
            error:"User not found."
        });
        const posts = await TeamMate.find({author:user._id}).populate({
            path:"author",
            select:"regno name optprofilepicture phoneno"
        }).lean();
        const tagedPosts = posts.map(post=>({...post,tag:"Find A Teammate"}));
        return response.status(200).send(tagedPosts);
    }catch(err){
        return response.status(500).send({
            error : `Internal Server Error : ${err.message}`
        });
    }
});

profileRouter.get("/myteammates/mycomments",authenticateToken, async (request, response)=>{
    try{
        const { regno } = request.user;
        const user = await Users.findOne({regno});
        if(!user) return response.status(404).send({
            error:"User not found."
        });
        const posts = await TeamMate.find({"comments.userID":user._id})
        .populate("author","regno name optprofilepicture")
        .populate("comments.userID","regno name")
        .lean();
        const tagedPosts = posts.map(post=>({...post,tag:"Find A Teammate"}));
        const filteredPosts = tagedPosts.map(post=>(
            {...post,
                comments: post.comments.filter(comment=>comment.userID._id.toString()===user._id.toString())
            }
        ));
        return response.status(200).send(filteredPosts);
    }catch(err){
        return response.status(500).send({
            error : `Internal Server Error : ${err.message}`
        });
    }
});

profileRouter.get("/myqueries",authenticateToken, async (request, response)=>{
    try{
        const { regno } = request.user;
        const user = await Users.findOne({regno});
        if(!user) return response.status(404).send({
            error:"User not found."
        });
        const posts = await Queries.find({author:user._id}).populate({
            path:"author",
            select:"regno name optprofilepicture phoneno"
        }).lean();
        const tagedPosts = posts.map(post=>({...post,tag:"Queries"}));
        return response.status(200).send(tagedPosts);
    }catch(err){
        return response.status(500).send({
            error : `Internal Server Error : ${err.message}`
        });
    }
});

profileRouter.get("/myqueries/mycomments",authenticateToken, async (request, response)=>{
    try{
        const { regno } = request.user;
        const user = await Users.findOne({regno});
        if(!user) return response.status(404).send({
            error:"User not found."
        });
        const posts = await Queries.find({"comments.userID":user._id})
        .populate("author","regno name optprofilepicture")
        .populate("comments.userID","regno name")
        .lean();
        const tagedPosts = posts.map(post=>({...post,tag:"Queries"}));
        const filteredPosts = tagedPosts.map(post=>(
            {...post,
                comments: post.comments.filter(comment=>comment.userID._id.toString()===user._id.toString())
            }
        ));
        return response.status(200).send(filteredPosts);
    }catch(err){
        return response.status(500).send({
            error : `Internal Server Error : ${err.message}`
        });
    }
});

profileRouter.get("/myqueries/mylikes",authenticateToken, async (request, response)=>{
    try{
        const { regno } = request.user;
        const user = await Users.findOne({regno});
        if(!user) return response.status(404).send({
            error:"User not found."
        });
        const posts = await Queries.find({likes:user._id}).populate({
            path:"author",
            select:"regno name optprofilepicture phoneno"
        }).lean();
        const tagedPosts = posts.map(post=>({...post,tag:"Queries"}));
        return response.status(200).send(tagedPosts);
    }catch(err){
        return response.status(500).send({
            error : `Internal Server Error : ${err.message}`
        });
    }
});

export default profileRouter;