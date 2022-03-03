export const LOG_IN = 'LOG_IN';
const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const REQUEST_PRODUCTS_SUCCESS = 'REQUEST_PRODUCTS_SUCCESS';

export const loginAction = (user) => ({
  type: LOG_IN,
  payload: {
    email: user.email,
    userName: user.userName,
    password: user.password,
  }
})

const requestProductsAction = () => ({ type: REQUEST_PRODUCTS })  
const requestProductsSuccess = (data) => ({ type: REQUEST_PRODUCTS_SUCCESS, payload: data })  

export const fetchProducts = (search) => {
  return async (dispatch) => {
    dispatch(requestProductsAction());
    try {
      const url = `https://api.mercadolibre.com/sites/MLB/search?q=${search}`
      const response = await fetch(url);
      const data = await response.json();
      dispatch(requestProductsSuccess(data))
    } catch (error) {
      console.error(error);
    }
  }
};
