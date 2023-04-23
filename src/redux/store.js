import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas";
import logger from "redux-logger";
import { systemSlice } from "./slices/systemSlice";
import { chatSlice } from "./slices/chatSlice";

const middleware = [];
let sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware);

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    chat: chatSlice.reducer,
    system: systemSlice.reducer,
  },
  middleware,
  devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(rootSaga);

export default store;
