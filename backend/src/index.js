import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

app.use(express.json({ limit: "10mb" })); // increase JSON body limit
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// 1️⃣ CORS middleware first
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // allow cookies
  })
);

// 2️⃣ Cookie parser and JSON middleware
app.use(cookieParser());

// 3️⃣ Routes after middleware
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// 4️⃣ Start server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
