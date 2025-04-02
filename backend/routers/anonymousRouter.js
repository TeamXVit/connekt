import express from "express";
import mongoose from "mongoose";
import authenticateToken from "../middleware/authMiddleware.js";
import { Anonymous } from "../models/Anonymous.js";
import { Users } from "../models/User.js";

const anonymousRouter = express.Router();

anonymousRouter.post("/post",authenticateToken, async (request,response)=>{
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
        await Anonymous.create({
            content,
            author: user._id,
            createdAt: time,
            expireAt: TTL
        });
        return response.status(200).send({
            message:"Anonymous Post created successfully."
        });
    }catch(err){
        return response.status(500).send({
            error : `Internal Server Error : ${err.message}`
        });
    }
});

anonymousRouter.get("/view", authenticateToken, async (request, response)=>{
    try{
        response.setHeader("Content-Type", "text/event-stream");
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Connection", "keep-alive");
        response.flushHeaders();
        const changeStream = Anonymous.watch();
        async function sendPosts(){
            try{
                const posts = await Anonymous.find().lean();
                const anonymousPosts = posts.map(post=>({
                    ...post,
                    author: undefined,
                    comments: post.comments.map(comment=>({
                        ...comment,
                        userID: undefined
                    }))
                }));
                response.write(`data: ${JSON.stringify(anonymousPosts)}\n\n`);
            }catch(err){
                console.error("Error fetching posts:", err);
            }
        }
        await sendPosts();
        changeStream.on("change", sendPosts);
        changeStream.on("error", err => {
            console.error("Change Stream Error:", err);
            changeStream.close();
        });
        request.on("close", () => {
            changeStream.close();
            response.end();
        });
    }catch(err){
        console.error("SSE Error:", err);
        if(!response.headersSent){
            response.status(500).json({error:`Internal Server Error: ${err.message}`});
        }
    }
});

anonymousRouter.post("/comment/:id",authenticateToken, async (request, response)=>{
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
        const post = await Anonymous.findById(id);
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
    
export default anonymousRouter;