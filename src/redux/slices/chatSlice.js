import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    loading: true,
    chats: [],
    chatMessages: [],
    dialogUser: null,
  },
  reducers: {
    setLoadingChats: (state, action) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
    setChats: (state, action) => {
      const newChats = action.payload;
      return {
        ...state,
        chats: newChats,
      };
    },
    setOnline: (state, action) => {},
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

export const {
  setChats,
  setOnline,
  setChatMessages,
  setDialogUser,
  setLoadingChats,
} = chatSlice.actions;
