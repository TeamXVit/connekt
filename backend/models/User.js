import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    name:{type:String, require: true},
    regno:{type:String, require: true},
    password:{type:String, require: true},
    gender:{type:String, require: true},
    email:{type:String, require: true},
    phoneno:{type:String, require: true},
    dob:{type:Date, require: true},
    isVerified: { type: Boolean, default: false },
    resetToken: {type: String, default: null},
    profilepicture:{type:String},
    optprofilepicture:{type:String},
    instagram:{type:String}
});

export const Users =  new mongoose.model("Users",usersSchema,"Users");