import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isuserLoading: false,
  ismessageLoading: false,

  getUsers: async () => {
    set({ isuserLoading: true });
    try {
      const res = await axiosInstance.get("messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error("Error fetching users. Please try again.");
      console.error("Error fetching users:", error);
      set({ users: [] });
    } finally {
      set({ isuserLoading: false });
    }
  },
  getMessages: async (userId) => {
    set({ ismessageLoading: true });
    try {
      const res = await axiosInstance.get(`messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error("Error fetching messages. Please try again.");
      console.error("Error fetching messages:", error);
      set({ messages: [] });
    } finally {
      set({ ismessageLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error("Error sending message. Please try again.");
      console.error("Error sending message:", error);
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
