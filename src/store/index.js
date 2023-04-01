import { configureStore } from "@reduxjs/toolkit";

import systemReducer from "./systemSlice";
import userReducer from "./userSlice";
import chatsReducer from "./chatsSlice";

export const store = configureStore({
  reducer: {
    system: systemReducer,
    user: userReducer,
    chats: chatsReducer,
  },
});
