import express from "express";
import mongoose from "mongoose";
import authenticateToken from "../middleware/authMiddleware.js";
import { Queries } from "../models/Queries.js";
import { Users } from "../models/User.js";

const queriesRouter = express.Router();

queriesRouter.post("/post",authenticateToken, async (request,response)=>{
    try{
        const { regno } = request.user; 
        const { content, ttl, time } = request.body;
        if(!content || !ttl || !time){
            return response.status(400).send({
                error: "All required fields must be filled."
            });
        }
        if (typeof ttl !== "number" || ttl <= 0) {
            return response.status(400).json({ error: "TTL must be a positive number." });
        }
        const user = await Users.findOne({regno});
        if(!user) return response.status(404).send({
            error: "User not found."
        });
        const TTL = new Date(Date.now()+ttl*1000);
        await Queries.create({
            content,
            author: user._id,
            createdAt: time,
            expireAt: TTL
        });
        return response.status(200).send({
            message:"Queries Post created successfully."
        });
    }catch(err){
        return response.status(500).send({
            error : `Internal Server Error : ${err.message}`
        });
    }
});

queriesRouter.get("/view", authenticateToken, async (request, response) => {
    try {
        response.setHeader("Content-Type", "text/event-stream");
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Connection", "keep-alive");
        response.flushHeaders();
        const changeStream = Queries.watch();
        async function sendPosts(){
            try {
                const posts = await Queries.find()
                .populate("author", "regno name optprofilepicture")
                .populate("comments.userID", "regno name optprofilepicture")
                .populate("likes","regno")
                .lean();
                const formattedPosts = posts.map(post => ({
                    ...post,
                    likes: post.likes.map(user => user.regno)
                }));
                response.write(`${JSON.stringify(formattedPosts)}\n\n`);
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

queriesRouter.patch("/like/:id",authenticateToken, async (request, response)=>{
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
        const post = await Queries.findById(id);
        if(!post) return response.status(404).send({
            error: "Post not found."
        });
        const userIdStr = user._id.toString();
        const likedIndex = post.likes.map(id => id.toString()).indexOf(userIdStr);
        if(likedIndex === -1){
            post.likes.push(user._id);
            await post.save();
            return response.status(200).json({ message: "Post liked successfully." });
        }else{
            post.likes.splice(likedIndex, 1);
            await post.save();
            return response.status(200).json({ message: "Post unliked successfully." });
        }
    }catch(err){
        return response.status(500).send({
            error : `Internal Server Error : ${err.message}`
        });
    }
});

queriesRouter.post("/comment/:id",authenticateToken, async (request, response)=>{
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
        const post = await Queries.findById(id);
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

queriesRouter.delete("/comment/:id", authenticateToken, async (request, response)=>{
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
        const post = await Queries.findOne({"comments._id":id});
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

queriesRouter.delete("/delete/:id", authenticateToken, async (request, response)=>{
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
        const post = await Queries.findById(id);
        if(!post) return response.status(404).send({
            error: "Post not found."
        });
        if(!post.author.equals(user._id)) return response.status(400).send({
            error: "Access denied."
        });
        await Queries.findByIdAndDelete(id);
        return response.status(200).send({ 
            message: "Post deleted successfully." 
        });
    }catch(err){
        return response.status(500).send({
            error : `Internal Server Error : ${err.message}`
        });
    }
});
    
export default queriesRouter;