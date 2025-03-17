import mongoose from "mongoose";
import { commentSchema } from "./Comments.js";

const anonymousSchema = new mongoose.Schema({
    content: {type:String, require:true},
    author : {type:mongoose.Schema.Types.ObjectId, ref:"Users", require:true},
    comments: [commentSchema],
    createdAt: {type:Date, require: true},
    expireAt: {type:Date, require:true}
});

anonymousSchema.index({expireAt: 1},{expireAfterSeconds: 0});

export const Anonymous = new mongoose.model("Anonymous",anonymousSchema,"Anonymous");