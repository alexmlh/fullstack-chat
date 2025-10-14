import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:5173" } });

const userSocketsMap = new Map();

// ✅ Demo user ID (always online)
const DEMO_USER_ID = "68e91687e91ad84e9a8e1be5";
userSocketsMap.set(DEMO_USER_ID, null); // null because no real socket

export const getReceiverSocketId = (userId) => userSocketsMap.get(userId);

// Utility to emit online users
const emitOnlineUsers = () => {
  io.emit("getOnlineUsers", Array.from(userSocketsMap.keys()));
};

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketsMap.set(userId, socket.id);
    emitOnlineUsers();
  }

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    if (userId) userSocketsMap.delete(userId);
    emitOnlineUsers();
  });
});

export { io, server, app };
