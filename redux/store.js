// import { createStore, applyMiddleware } from "redux";
// // import thunk from "redux-thunk";
// import logger from "redux-logger";
// import createSagaMiddleware from "redux-saga";

// import rootReducer from "./root-reducer";

// import rootSaga from "./sagas";

// const sagaMiddleware = createSagaMiddleware();

// const middleware = [sagaMiddleware];

// if (process.env.NODE_ENV === "development") {
//   middleware.push(logger);
// }

// const store = createStore(rootReducer, applyMiddleware(...middleware));

// sagaMiddleware.run(rootSaga);

// export default store;

import { configureStore } from "@reduxjs/toolkit";

export default store = configureStore({
  reducer: {},
});
