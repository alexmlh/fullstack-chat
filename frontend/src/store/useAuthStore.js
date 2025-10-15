import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useChatStore } from "./useChatStore.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

// Different URLs for API and socket
const API_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

const SOCKET_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : undefined;

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.error("Error checking auth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (formData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", formData);
      set({ authUser: res.data });
      get().connectSocket();
      toast.success("Signup successful!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again."
      );
      console.error("Signup error:", error);
      throw error;
    } finally {
      set({ isSigningUp: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      get().disconnectSocket();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout error:", error);
    }
  },
  login: async (formData) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      set({ authUser: res.data });
      toast.success("Login successful!");
      get().connectSocket();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
      console.error("Login error:", error);
      throw error;
    } finally {
      set({ isLoggingIn: false });
    }
  },
  updateProfile: async (updateData) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", updateData);
      set({ authUser: res.data });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Profile update failed. Please try again."
      );
      console.error("Update profile error:", error);
      throw error;
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(SOCKET_URL, {
      query: { userId: authUser._id },
      autoConnect: false,
    });
    set({ socket });
    socket.connect();

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
    socket.on("newMessage", (message) => {
      if (message.senderId !== useChatStore.getState()?.selectedUser._id)
        return;
      const messages = useChatStore.getState().messages;
      useChatStore.setState({ messages: [...messages, message] });
    });
  },
  disconnectSocket: () => {
    if (get().socket) {
      get().socket.disconnect();
      set({ socket: null, onlineUsers: [] });
    }
  },
}));
