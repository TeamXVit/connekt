import mongoose from "mongoose";
import fs from "fs";
import {Users} from "../models/User.js";
import "dotenv/config";

async function fetchDataAndWriteToFile() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
        const data = await Users.find(); // write your query here
        if (data.length === 0) {
            console.log("No users found.");
            return;
        }
        const textData = data.map(doc => doc.email).join("\n");
        fs.writeFileSync("email.txt", textData);
        console.log("Emails written to email.txt in root directory");
    } catch (error) {
        console.error("Error:", error);
    } finally {
        mongoose.connection.close();
    }
}

fetchDataAndWriteToFile();