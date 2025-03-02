import express, { application } from "express";
import dotenv from "dotenv";
import authRoutes from "../src/routes/auth.routes.js"
import messageRoutes from "../src/routes/message.routes.js"
import {connectDB} from "../src/lib/db.js"
import cookieParser from "cookie-parser"
import { app, server } from "./lib/socket.js";
import cors from "cors";
import path from "path";
dotenv.config()

const PORT = process.env.PORT
const __dirname = path.resolve();
app.use(express.json({ limit: '50mb' })); // Adjust the limit to your needs
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
server.listen(PORT , ()=> {
    console.log(`server is running on port ${PORT}`)
    connectDB()
});

