import express from "express";
import mongoose from "mongoose";
import authenticateToken from "../middleware/authMiddleware.js";
import { LostAndFound } from "../models/LostAndFound.js";
import { Users } from "../models/User.js";
import { v2 as cloudinary} from "cloudinary";
import "dotenv/config";
import multer from "multer";

cloudinary.config({secure:true});
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 } 
});
const lostAndFoundRouter = express.Router();

lostAndFoundRouter.post("/post", authenticateToken, upload.single("image"), async (request, response) => {
    try {
        const { regno } = request.user; 
        const { content, showphoneno, ttl, time } = request.body;
        if (!content || showphoneno === undefined || !ttl || !time) {
            return response.status(400).json({ error: "All required fields must be filled." });
        }
        if (typeof ttl !== "number" || ttl <= 0) {
            return response.status(400).json({ error: "TTL must be a positive number." });
        }
        const user = await Users.findOne({ regno });
        if (!user) return response.status(404).json({ error: "User not found." });
        let imageUrl = null;
        if (request.file) {
            if (!["image/jpeg", "image/png"].includes(request.file.mimetype)) {
                return response.status(400).json({ error: "Only JPG and PNG files are allowed." });
            }
            const config = {
                folder: "lost-and-found",
                resource_type: "image",
                use_filename: true,
                unique_filename: true
            };
            const b64 = Buffer.from(request.file.buffer).toString("base64");
            const dataURI = `data:${request.file.mimetype};base64,${b64}`;
            const result = await cloudinary.uploader.upload(dataURI, config);
            imageUrl = result.secure_url;
        }
        const TTL = new Date(Date.now() + ttl * 1000);
        await LostAndFound.create({
            content,
            showphoneno,
            image: imageUrl,
            author: user._id,
            createdAt: time,
            expireAt: TTL
        });
        return response.status(200).json({
            message: "LostAndFound Post created successfully.",
            image: imageUrl
        });
    } catch (err) {
        return response.status(500).json({ error: `Internal Server Error: ${err.message}` });
    }
});

lostAndFoundRouter.get("/view", authenticateToken, async (request, response) => {
    try {
        response.setHeader("Content-Type", "text/event-stream");
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Connection", "keep-alive");
        response.flushHeaders();
        const { gender } = request.user;
        const changeStream = LostAndFound.watch();
        async function sendPosts(){
            try {
                const posts = await LostAndFound.find()
                .populate("author", "regno name optprofilepicture phoneno")
                .populate("comments.userID", "regno name optprofilepicture")
                .lean();
                posts.forEach(post => {
                    if (post.author && !post.showphoneno) {
                        delete post.author.phoneno;
                    }
                });
                response.write(`${JSON.stringify(posts)}\n\n`);
            } catch (err) {
                console.error("Error fetching posts:", err);
            }
        };
        await sendPosts();
        changeStream.on("change", sendPosts);
        request.on("close", () => {
            changeStream.close();
            response.end();
        });
    }catch(err){
        console.error("SSE Error:", err);
        if(!response.headersSent){
            response.status(500).json({ error: `Internal Server Error: ${err.message}` });
        }
    }
});

lostAndFoundRouter.post("/comment/:id",authenticateToken, async (request, response)=>{
    try{
        const {regno} = request.user;
        const {id} = request.params;
        const {comment, time} = request.body;
        if(!comment || !time){
            return response.status(400).send({
                error: "All required fields must be filled."
            });
        }
        const user = await Users.findOne({regno});
        if(!user) return response.status(404).send({
            error: "User not found."
        });
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).json({ error: "Invalid ID format." });
        }
        const post = await LostAndFound.findById(id);
        if(!post) return response.status(404).send({
            error: "Post not found."
        });
        post.comments.push({userID:user._id,comment:comment,createdAt:time});
        await post.save();
        return response.status(201).send({
            message:"Comment added successfully"
        });
    }catch(err){
        return response.status(500).send({
            error : `Internal Server Error : ${err.message}`
        });
    }
});

lostAndFoundRouter.delete("/comment/:id", authenticateToken, async (request, response)=>{
    try{
        const { regno } = request.user;
        const { id } = request.params;
        const user = await Users.findOne({regno});
        if(!user) return response.status(404).send({
            error: "User not found."
        });
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).json({ error: "Invalid ID format." });
        }
        const post = await LostAndFound.findOne({"comments._id":id});
        if(!post) return response.status(404).send({
            error: "Post not found."
        });
        const comment = post.comments.id(id);
        if(!comment) return response.status(404).send({
            error: "Comment not found."
        });
        if(!comment.userID.equals(user._id)) return response.status(403).send({
            error: "Unauthorized: You can only delete your own comments."
        }); 
        comment.deleteOne();
        await post.save();
        return response.status(200).send({
            message : "Comment deleted successfully."
        });
    }catch(err){
        return response.status(500).send({
            error : `Internal Server Error : ${err.message}`
        });
    }
});

lostAndFoundRouter.delete("/delete/:id", authenticateToken, async (request, response)=>{
    try{
        const {regno} = request.user;
        const {id} = request.params;
        const user = await Users.findOne({regno});
        if(!user) return response.status(404).send({
            error: "User not found."
        });
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).json({ error: "Invalid ID format." });
        }
        const post = await LostAndFound.findById(id);
        if(!post) return response.status(404).send({
            error: "Post not found."
        });
        if(!post.author.equals(user._id)) return response.status(400).send({
            error: "Access denied."
        });
        await LostAndFound.findByIdAndDelete(id);
        return response.status(200).send({ 
            message: "Post deleted successfully." 
        });
    }catch(err){
        return response.status(500).send({
            error : `Internal Server Error : ${err.message}`
        });
    }
});
    
export default lostAndFoundRouter;