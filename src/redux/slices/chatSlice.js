import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
  },
  reducers: {
    setChats: (state, action) => {
      const newChats = action.payload;
      return {
        ...state,
        chats: newChats,
      };
    },
  },
});

export const { setChats } = chatSlice.actions;
