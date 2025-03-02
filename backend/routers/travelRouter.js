import express from "express";
import authenticateToken from "../middleware/authMiddleware.js";
import { Travel } from "../models/Travel.js";
import { Users } from "../models/User.js";

const travelRouter = express.Router();

travelRouter.post("/post",authenticateToken, async (request,response)=>{
    try{
        const { regno } = request.user; 
        const { content, preferences, showphoneno, ttl, time } = request.body;
        if(!content || !preferences || showphoneno===undefined || !ttl || !time){
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
        await Travel.create({
            content,preferences,showphoneno,
            author: user._id,
            createdAt: time,
            expireAt: TTL
        });
        return response.status(200).send({
            message:"Travel Post created successfully."
        });
    }catch(err){
        return response.status(500).send({
            error : `Internal Server Error : ${err.message}`
        });
    }
});

travelRouter.get("/view", authenticateToken, async (request, response) => {
    try {
        response.setHeader("Content-Type", "text/event-stream");
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Connection", "keep-alive");
        response.flushHeaders();
        const { gender } = request.user;
        const db = getDB();
        const changeStream = Travel.watch();
        async function sendPosts(){
            try {
                const posts = await Travel.find({
                    $or: [{ preferences: "All" }, { preferences: gender }]
                })
                .populate("author", "regno name optprofilepicture phoneno")
                .lean();
                posts.forEach(post => {
                    if (post.author && !post.showphoneno) {
                        delete post.author.phoneno;
                    }
                });
                response.write(`data: ${JSON.stringify(posts)}\n\n`);
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

travelRouter.delete("/delete/:id",authenticateToken, async (request,response)=>{
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
        const post = await Travel.findById(id);
        if(!post) return response.status(404).send({
            error: "Post not found."
        });
        if(post.author.equals(user._id)) return response.status(400).send({
            error: "Access denied."
        });
        await Travel.findByIdAndDelete(id);
        return response.status(200).send({ 
            message: "Post deleted successfully." 
        });
    }catch(err){
        return response.status(500).send({
            error : `Internal Server Error : ${err.message}`
        });
    }
});

export default travelRouter;