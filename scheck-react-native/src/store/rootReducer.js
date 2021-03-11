import { combineReducers } from 'redux';
import temp from "./reducer/tempReducer"

const rootReducer = combineReducers({
  temp
});

export default rootReducer;
