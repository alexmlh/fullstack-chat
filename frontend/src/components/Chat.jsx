import React from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const Chat = () => {
  const { authUser } = useAuthStore();
  const { messages } = useChatStore();
  console.log(messages);
  console.log(authUser);
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message._id}
          className={`chat ${
            message.senderId === authUser._id ? "chat-end" : "chat-start"
          }`}
        >
          <div className="chat-image avatar">
            <div className="size-10 rounded-full border border-base-300">
              <img
                src={
                  message.senderId === authUser._id
                    ? authUser.profilePic || "/avatar.png"
                    : message.senderProfilePic || "/avatar.png"
                }
                alt="profile pic"
              />
            </div>
          </div>
          <div className="chat-header mb-1">
            <time className="text-xs opacity-40 ml-1">{message.createdAt}</time>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chat;
