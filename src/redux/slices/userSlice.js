import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {},
  },
  reducers: {
    setUser: (state, action) => {
      return {
        currentUser: action.payload,
      };
    },
  },
});

export const { setUser } = userSlice.actions;
