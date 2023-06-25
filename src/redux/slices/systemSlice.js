import { createSlice } from "@reduxjs/toolkit";

export const systemSlice = createSlice({
  name: "system",
  initialState: {
    status: "loading",
    contextMenu: null,
  },
  reducers: {
    setLoadingStatus: (state, action) => {
      return { ...state, status: action.payload };
    },
    setContextMenu: (state, action) => {
      return { ...state, contextMenu: action.payload };
    },
  },
});

export const { setContextMenu, setLoadingStatus } = systemSlice.actions;
