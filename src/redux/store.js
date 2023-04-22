import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas";
import logger from "redux-logger";
import { systemSlice } from "./slices/systemSlice";
import { chatSlice } from "./slices/chatSlice";

let sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

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
