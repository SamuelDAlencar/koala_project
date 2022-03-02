export const LOG_IN = 'LOG_IN';

export const loginAction = (user) => ({
  type: LOG_IN,
  payload: {
    email: user.email,
    password: user.password,
  }
})
