import mongoose from "mongoose";
import { commentSchema } from "./Comments.js";

const queriesSchema = new mongoose.Schema({
    image: {type:String, require:true},
    content: {type:String, require:true},
    author : {type:mongoose.Schema.Types.ObjectId, ref:"Users", require:true},
    likes: [{type:mongoose.Schema.Types.ObjectId, ref:"Users"}],
    comments: [commentSchema],
    createdAt: {type:Date, require: true},
    expireAt: {type:Date, require:true}
});

queriesSchema.index({expireAt: 1},{expireAfterSeconds: 0});

export const Queries = new mongoose.model("Queries",queriesSchema,"Queries");