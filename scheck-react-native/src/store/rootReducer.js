import { combineReducers } from 'redux';
import user from "./reducer/userReducer"
import ingredients from "./reducer/ingredientReducer"

const rootReducer = combineReducers({
  user,
  ingredients
});

export default rootReducer;
