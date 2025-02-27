import mongoose from "mongoose";

const travelSchema = new mongoose.Schema({
    content: {type:String, require:true},
    preferences : {type:String, require:true},
    showphoneno : {type:Boolean, require:true},
    author : {type:mongoose.Schema.Types.ObjectId, ref:"Users", require:true},
    createdAt: {type:Date, require: true},
    expireAt: {type:Date, required:true}
});

travelSchema.index({expireAt: 1},{expireAfterSeconds: 0});

export const Travel = new mongoose.model("Travel",travelSchema,"Travel");