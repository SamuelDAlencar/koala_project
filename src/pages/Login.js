import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAction } from '../redux/actions';

function Login() {
  const MIN_PASS_LENGTH = 8;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [passVisibility, setPassVisibility] = useState(false);

  const inputHandler = ({ target: { id, value } }) => {
    setUser((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }

  const logButton = () => {
    dispatch(loginAction(user));
    navigate('/home');
  }

  return (
    <>
      <h1>Login</h1>
      <form>
        <label htmlFor="user-email">
          Email
          <input
            id="email"
            data-testid="email-input"
            onChange={ inputHandler }
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            id="password"
            data-testid="password-input"
            type={
              passVisibility
              ? 'text'
              : 'password'
            }
            onChange={ inputHandler }
          />
        </label>
        <input
          type="checkbox"
          onClick={
            () => setPassVisibility((prevState) => !prevState) } />
        <button
          onClick={ logButton }
          type="button"
          disabled={
            !(user.email.includes('@')
            && user.email.includes('.com')
            && user.password.length >= MIN_PASS_LENGTH)
          }
        >Log In!</button>
        <button onClick={ () => navigate('createaccount') }>
          Create account
        </button>
      </form>
    </>
  );
}

export default Login;
