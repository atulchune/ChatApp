import express, { application } from "express";
import dotenv from "dotenv";
import authRoutes from "../src/routes/auth.routes.js"
import messageRoutes from "../src/routes/message.routes.js"
import {connectDB} from "../src/lib/db.js"
import cookieParser from "cookie-parser"
dotenv.config()
const app  = express()
const PORT = process.env.PORT
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);
app.use(cookieParser());
app.listen(PORT , ()=> {
    console.log(`server is running on port ${PORT}`)
    connectDB()
});

