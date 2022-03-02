import { REQUEST_PRODUCTS_SUCCESS } from '../actions';

const INITIAL_STATE = {
  products: [],
}

const productsReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case REQUEST_PRODUCTS_SUCCESS:
      return payload   
    default:
      return state;
  }
}

export default productsReducer
