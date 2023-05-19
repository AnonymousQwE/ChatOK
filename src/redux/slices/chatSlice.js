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
  },
});

export const { setChats, setChatMessages } = chatSlice.actions;
