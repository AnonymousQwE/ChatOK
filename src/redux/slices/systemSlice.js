import { createSlice } from "@reduxjs/toolkit";

export const systemSlice = createSlice({
  name: "system",
  initialState: {
    status: "loading",
    contextMenu: null,
    messageContextMenu: null,
  },
  reducers: {
    setLoadingStatus: (state, action) => {
      return { ...state, status: action.payload };
    },
    setContextMenu: (state, action) => {
      return { ...state, contextMenu: action.payload };
    },
    setMessageContextMenu: (state, action) => {
      return { ...state, messageContextMenu: action.payload };
    },
  },
});

export const { setContextMenu, setLoadingStatus, setMessageContextMenu } =
  systemSlice.actions;
