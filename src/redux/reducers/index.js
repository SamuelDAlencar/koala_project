import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import productsReducer from './productsReducer';
import toggleHomeReducer from './toggleHomeReducer';

const rootReducer = combineReducers({
  user: loginReducer,
  products: productsReducer,
  toggleHome: toggleHomeReducer,
});

export default rootReducer;
