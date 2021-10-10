import { combineReducers } from 'redux';
import { data } from './data';

const createRootReducer = combineReducers({
  data,
});

export default createRootReducer;
