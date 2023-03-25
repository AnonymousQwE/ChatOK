import { createSlice } from "@reduxjs/toolkit";
// import {
//   createNewDialog,
//   logoutUser,
//   signInGoogle,
// } from "../hooks/firebaseHooks";
// import {
//   getUserData,
//   loginUser,
//   logoutUser,
//   registerUser,
// } from "../hooks/firebaseHooks";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: null,
    notify: [],
  },
  reducers: {
    clearNotify: (state) => {
      state.notify = [];
    },
    addUsers: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(createNewDialog.pending, (state) => {
    //   state.status = "loading";
    // });
    // builder.addCase(createNewDialog.fulfilled, (state, action) => {
    //   // state.user = action.payload;
    //   state.notify.push({
    //     type: "success",
    //     content: "Вы успешно авторизовались! Добро пожаловать!",
    //   });
    //   state.status = "loaded";
    // });
    // builder.addCase(createNewDialog.rejected, (state, action) => {
    //   state.notify.push({ type: "error", content: action.payload });
    //   state.status = "rejected";
    // });
  },
});

export const { clearNotify } = usersSlice.actions;

export default usersSlice.reducer;
