import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './rootReducer';
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();

export default store;
