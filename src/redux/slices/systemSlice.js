import { createSlice } from "@reduxjs/toolkit";

export const systemSlice = createSlice({
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
      return { ...state, contextMenu: action.payload };
    },
    unsetContextMenu: (state, action) => {
      return {
        ...state,
        contextMenu: { active: false, position: null, ref: null },
      };
    },
  },
});

export const { setContextMenu, unsetContextMenu } = systemSlice.actions;
