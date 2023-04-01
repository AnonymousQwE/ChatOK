import { createSlice } from "@reduxjs/toolkit";
import { createNewMessage, syncUserChats } from "./chatsThunk";

const userSlice = createSlice({
  name: "chats",
  initialState: {
    messages: [],
    chats: [],
    status: null,
    notify: [],
  },
  reducers: {
    clearNotify: (state) => {
      state.notify = [];
    },
    addChats: (state, action) => {
      state.chats = action.payload;
    },
    addMessages: (state, action) => {
      state.chats = state.chats.map((chat) => {
        if (action.payload[0].chatId == chat.id) {
          const newMessages = [...action.payload];
          return {
            ...chat,
            messages: newMessages,
          };
        } else {
          return chat;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(syncUserChats.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(syncUserChats.fulfilled, (state, action) => {
      state.status = "loaded";
    });
    builder.addCase(syncUserChats.rejected, (state, action) => {
      state.notify.push({ type: "error", content: action.payload });
      state.status = "rejected";
    });
    builder.addCase(createNewMessage.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createNewMessage.fulfilled, (state, action) => {
      state.status = "loaded";
    });
    builder.addCase(createNewMessage.rejected, (state, action) => {
      state.notify.push({ type: "error", content: action.payload });
      state.status = "rejected";
    });
  },
});

export const { clearNotify, addChats, addMessages } = userSlice.actions;

export default userSlice.reducer;
