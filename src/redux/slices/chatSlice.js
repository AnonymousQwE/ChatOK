import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    chatMessages: [],
  },
  reducers: {
    setChats: (state, action) => {
      const newChats = action.payload;
      return {
        ...state,
        chats: newChats,
      };
    },
    setChatMessages: (state, action) => {
      const allMessages = action.payload;
      return {
        ...state,
        chatMessages: allMessages,
      };
    },
    setOnlineUsers: (state, action) => {
      const allUsers = action.payload;
      // console.log(allUsers);

      const currentChats = state.chats.map((chat) => {
        return {
          ...chat,
          currentChatUser: {
            ...chat.currentChatUser,
            online: allUsers[chat.currentChatUser.id],
          },
        };
      });
      return { ...state, chats: currentChats };
    },
  },
});

export const { setChats, setChatMessages, setOnlineUsers } = chatSlice.actions;
