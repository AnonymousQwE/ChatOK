import { combineReducers } from "redux";

import contactReducer from "./reducer";

const rootReducer = combineReducers({
  data: contactReducer,
});

export default rootReducer;
