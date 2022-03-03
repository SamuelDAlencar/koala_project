import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAction } from '../redux/actions';
import { MIN_PASS_LENGTH } from '../consts';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: '',
    userName: '',
    password: '',
  });
  const [passVisibility, setPassVisibility] = useState(false);
  const [invalidFields, setInvalidFields] = useState({
    wrongPassword: false,
    inexistentUser: false,
  });

  const inputHandler = ({ target: { id, value } }) => {
    setUser((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }

  const logButton = () => {
    const { email, password } = user;
    const userAccount = JSON.parse(localStorage.getItem(email));
    
    if (userAccount
      && password === userAccount.password) {
      dispatch(loginAction(user));
      navigate('/home');
    } else if (!userAccount) {
      setInvalidFields({ wrongPassword: false, inexistentUser: true });
      setTimeout(() =>
      setInvalidFields((prevState) => ({ ...prevState, inexistentUser: false })), 5000)
    } else if (password !== userAccount.password) {
      setInvalidFields({ inexistentUser: false, wrongPassword: true });
      setTimeout(() =>
      setInvalidFields((prevState) => ({ ...prevState, wrongPassword: false })), 5000)
    }
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
        >Log In</button>
        <button onClick={ () => navigate('createaccount') }>
          Create account
        </button>
        {invalidFields.inexistentUser
        && <p style={ { color: 'red' } }>
            There's nobody with this email in our database
          </p>}
        {invalidFields.wrongPassword
        && <p style={ { color: 'red' } }>
            Wrong password
          </p>}
      </form>
    </>
  );
}

export default Login;
