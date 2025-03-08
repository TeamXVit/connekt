import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema({
    userID : {type:mongoose.Schema.Types.ObjectId, ref:"Users", require:true},
    comment : {type:String, require:true},
    createdAt: {type:Date, require: true},
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }
});
