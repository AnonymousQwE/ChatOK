import { createSlice } from "@reduxjs/toolkit";

export const systemSlice = createSlice({
  name: "system",
  initialState: {
    status: "loading",
    contextMenu: {
      active: false,
      position: null,
      ref: null,
    },
  },
  reducers: {
    setLoadingStatus: (state, action) => {
      return { ...state, status: action.payload };
    },
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

export const { setContextMenu, unsetContextMenu, setLoadingStatus } =
  systemSlice.actions;
