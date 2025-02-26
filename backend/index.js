import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routers/authRoutes.js";
import profileRouter from "./routers/profileRoutes.js";
import travelRouter from "./routers/travelRouter.js";
import path from "path";
import "dotenv/config";

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("connected to mongodb");
}).catch((err)=>{
    console.log(`something went wrong : ${err}`);
});

const app = express();
app.set('view engine', 'ejs');
app.set("views", path.join(process.cwd(),"views"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth",authRouter);
app.use("/profile", profileRouter);
app.use("/travel",travelRouter);

app.get("/",(request, response)=>{
    response.status(200).send({
        message:"connekt backend server is active"
    });
});

app.listen(process.env.PORT,()=>{
    console.log(`server listening at port ${process.env.PORT}`);
});
