import mongoose from "mongoose";
import { commentSchema } from "./Comments.js";

const teamMateSchema = new mongoose.Schema({
    content: {type:String, require:true},
    showphoneno : {type:Boolean, require:true},
    author : {type:mongoose.Schema.Types.ObjectId, ref:"Users", require:true},
    comments: [commentSchema],
    createdAt: {type:Date, require: true},
    expireAt: {type:Date, require:true}
});

teamMateSchema.index({expireAt: 1},{expireAfterSeconds: 0});

export const TeamMate = new mongoose.model("TeamMate",teamMateSchema,"TeamMate");