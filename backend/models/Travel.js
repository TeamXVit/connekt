import mongoose from "mongoose";
import { commentSchema } from "./Comments.js";

const travelSchema = new mongoose.Schema({
    content: {type:String, require:true},
    preferences : {type:String, require:true},
    showphoneno : {type:Boolean, require:true},
    author : {type:mongoose.Schema.Types.ObjectId, ref:"Users", require:true},
    comments: [commentSchema],
    createdAt: {type:Date, require: true},
    expireAt: {type:Date, require:true}
});

travelSchema.index({expireAt: 1},{expireAfterSeconds: 0});

export const Travel = new mongoose.model("Travel",travelSchema,"Travel");