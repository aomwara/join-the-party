import { combineReducers } from "redux";

import authReducer from "../slices/auth";
import registerReducer from "../slices/register";

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
});

export default rootReducer;
