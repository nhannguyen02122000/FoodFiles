import { combineReducers } from 'redux';
import user from "./reducer/userReducer"

const rootReducer = combineReducers({
  user
});

export default rootReducer;
