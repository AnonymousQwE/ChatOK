import { createSlice } from "@reduxjs/toolkit";

const systemSlice = createSlice({
  name: "system",
  initialState: {
    contextMenu: {
      active: false,
      position: null,
      ref: null,
    },
  },
  reducers: {
    setContextMenu: (state, action) => {
      state.contextMenu = action.payload;
    },
    unsetContextMenu: (state, action) => {
      state.contextMenu = { active: false, position: null, ref: null };
    },
  },
});

export const { setContextMenu, unsetContextMenu } = systemSlice.actions;

export default systemSlice.reducer;
