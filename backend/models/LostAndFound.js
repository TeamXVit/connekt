import mongoose from "mongoose";
import { commentSchema } from "./Comments.js";

const lostAndFoundSchema = new mongoose.Schema({
    image: {type:String, require:true},
    content: {type:String, require:true},
    preferences : {type:String, require:true},
    showphoneno : {type:Boolean, require:true},
    author : {type:mongoose.Schema.Types.ObjectId, ref:"Users", require:true},
    comments: [commentSchema],
    createdAt: {type:Date, require: true},
    expireAt: {type:Date, require:true}
});

lostAndFoundSchema.index({expireAt: 1},{expireAfterSeconds: 0});

export const LostAndFound = new mongoose.model("LostAndFound",lostAndFoundSchema,"LostAndFound");