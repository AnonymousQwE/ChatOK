import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    chatMessages: [],
    dialogUser: null,
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
    setDialogUser: (state, action) => {
      return {
        ...state,
        dialogUser: action.payload,
      };
    },
  },
});

export const { setChats, setChatMessages, setDialogUser } = chatSlice.actions;
