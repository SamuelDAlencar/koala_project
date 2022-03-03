import { LOG_IN } from '../actions'

const INITIAL_STATE = {
  email: '',
  userName: '',
  password: '',
}

const loginReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case LOG_IN:
      return ({
        email: payload.email,
        userName: payload.userName,
        password: payload.password,
      })
    default:
      return state;
  }
}

export default loginReducer;
