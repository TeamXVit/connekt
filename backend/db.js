import mongoose from "mongoose";
import "dotenv/config";

let dbConnection;

async function connectDB(){
    if (!dbConnection) {
        dbConnection = await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB Connected!");
    }
    return dbConnection;
}

function getDB(){
    return dbConnection;
}

export {connectDB, getDB};