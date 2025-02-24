import express from "express";
import authenticateToken from "../middleware/authMiddleware.js";
import { Users } from "../models/User.js";
import { v2 as cloudinary} from "cloudinary";
import "dotenv/config";
import multer from "multer";

cloudinary.config({secure:true});
const storage = multer.memoryStorage();
const upload = multer({storage});
const profileRouter = express.Router();

profileRouter.post("/upload-profilepicture",authenticateToken, upload.single("image"), async (request, response)=>{
    try{
        const { regno } = request.user;
        if(!request.file) return response.status(400).send({
            error: "Image is Required"
        });
        if(!["image/jpeg", "image/png"].includes(request.file.mimetype)) return response.status(400).send({
            error: "Only JPG and PNG files are allowed."
        });
        const user = await Users.findOne({regno});
        if(!user) return response.status(404).send({
            error: "User not Found"
        });
        const config = {
            public_id : regno,
            folder : "profile-pictures",
            unique_filename : false, 
            use_filename : true,
            resource_type: "image"
        };
        const b64 = Buffer.from(request.file.buffer).toString("base64");
        const dataURI = `data:${request.file.mimetype};base64,${b64}`;
        const result = await cloudinary.uploader.upload(dataURI, config);
        user.profilepicture = result.secure_url;
        await user.save();
        return response.status(200).send({
            message: "Profile picture uploaded successfully."
        });
    }catch(err){
        return response.status(500).send({
            error : `Internal Server Error : ${err.message}`
        });
    }
});

export default profileRouter;