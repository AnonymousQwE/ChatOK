import { createSlice } from "@reduxjs/toolkit";
import {
  createNewDialog,
} from "../hooks/firebaseHooks";
import { checkUser, logoutUser, signInGoogle } from "./userThunk";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    chats: [],
    status: null,
    notify: [],
  },
  reducers: {
    clearNotify: (state) => {
      state.notify = [];
    },
    addChat: (state, action) => {
      state.chats.push(action.payload);
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInGoogle.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(signInGoogle.fulfilled, (state, action) => {
      state.user = action.payload;
      state.notify.push({
        type: "success",
        content: "Вы успешно авторизовались! Добро пожаловать!",
      });
      state.status = "loaded";
    });
    builder.addCase(signInGoogle.rejected, (state, action) => {
      state.notify.push({ type: "error", content: action.payload });
      state.status = "rejected";
    });
    builder.addCase(checkUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(checkUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.notify.push({
        type: "success",
        content: "Вы успешно авторизовались! Добро пожаловать!",
      });
      state.status = "loaded";
    });
    builder.addCase(checkUser.rejected, (state, action) => {
      state.notify.push({ type: "error", content: action.payload });
      state.status = "rejected";
    });
    builder.addCase(createNewDialog.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createNewDialog.fulfilled, (state, action) => {
      // state.user = action.payload;
      state.notify.push({
        type: "success",
        content: "Вы успешно авторизовались! Добро пожаловать!",
      });
      state.status = "loaded";
    });
    builder.addCase(createNewDialog.rejected, (state, action) => {
      state.notify.push({ type: "error", content: action.payload });
      state.status = "rejected";
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.notify.push({
        type: "success",
        content: "Вы успешно вышли из системы. До свидания!",
      });
      state.status = "loaded";
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.status = "rejected";
      state.notify.push({ type: "error", content: action.payload });
    });
  },
});

export const { clearNotify, setChats, addChat, setUser } = userSlice.actions;

export default userSlice.reducer;
