import { createSlice } from "@reduxjs/toolkit";
// import {
//   getUserData,
//   loginUser,
//   logoutUser,
//   registerUser,
// } from "../hooks/firebaseHooks";

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
    status: null,
    notify: [],
  },
  reducers: {
    clearNotify: (state) => {
      state.notify = [];
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(getUserData.pending, (state) => {
  //     state.status = "loading";
  //   });
  //   builder.addCase(getUserData.fulfilled, (state, action) => {
  //     state.user += action.payload;
  //     state.status = "loaded";
  //   });
  //   builder.addCase(getUserData.rejected, (state, action) => {
  //     state.status = "rejected";
  //     state.notify.push({ type: "error", content: action.payload });
  //   });
  //   builder.addCase(loginUser.pending, (state) => {
  //     state.status = "loading";
  //   });
  //   builder.addCase(loginUser.fulfilled, (state, action) => {
  //     state.user = action.payload;
  //     state.notify.push({
  //       type: "success",
  //       content: "Вы успешно авторизовались! Добро пожаловать!",
  //     });
  //     state.status = "loaded";
  //   });
  //   builder.addCase(loginUser.rejected, (state, action) => {
  //     state.notify.push({ type: "error", content: action.payload });
  //     state.status = "rejected";
  //   });
  //   builder.addCase(registerUser.pending, (state, action) => {
  //     state.status = "loading";
  //   });
  //   builder.addCase(registerUser.fulfilled, (state, action) => {
  //     state.user = action.payload;
  //     state.notify.push({
  //       type: "success",
  //       content: "Вы успешно зарегистрировались!",
  //     });
  //     state.status = "loaded";
  //   });
  //   builder.addCase(registerUser.rejected, (state, action) => {
  //     state.notify.push({ type: "error", content: action.payload });
  //     state.status = "rejected";
  //   });
  //   builder.addCase(logoutUser.pending, (state) => {
  //     state.status = "loading";
  //   });
  //   builder.addCase(logoutUser.fulfilled, (state) => {
  //     state.user = {};
  //     state.notify.push({
  //       type: "success",
  //       content: "Вы успешно вышли из системы. До свидания!",
  //     });
  //     state.status = "loaded";
  //   });
  //   builder.addCase(logoutUser.rejected, (state, action) => {
  //     state.status = "rejected";
  //     state.notify.push({ type: "error", content: action.payload });
  //   });
  // },
});

export const { clearNotify, addMessage, setMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
