import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    currentChat: {
      messages: [],
      chatUser: null,
    },
  },
  reducers: {
    setChats: (state, action) => {
      return {
        ...state,
        chats: [...action.payload],
      };
    },
    setCurrentChat: (state, action) => {
      return {
        ...state,
        currentChat: {
          ...state.currentChat,
          ...action.payload,
        },
      };
    },
    setCurrentChatMessages: (state, action) => {
      return {
        ...state,
        currentChat: {
          ...state.currentChat,
          messages: action.payload,
        },
      };
    },
    setCurrentChatUser: (state, action) => {
      return {
        ...state,
        currentChat: {
          ...state.currentChat,
          chatUser: action.payload,
        },
      };
    },
  },
});

export const {
  setCurrentChat,
  setCurrentChatUser,
  setCurrentChatMessages,
  setChats,
} = chatSlice.actions;
