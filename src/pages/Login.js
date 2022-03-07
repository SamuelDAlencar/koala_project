import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAction } from '../redux/actions';
import { MIN_PASS_LENGTH } from '../consts';
import '../css/Login.css';

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
      navigate('/');
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
      <form className='login-form'>
        <h1 className="login-h1">Log-In</h1>
        <label className="login-form-input__label"  htmlFor="user-email">
          Email:
          {' '}
          <input
            id="email"
            className="login-form-input"
            data-testid="email-input"
            onChange={ inputHandler }
          />
        </label>
        <section className="password-section">
          <label className="login-form-input__label" htmlFor="password">
            Password:
            {' '}
            <input
              id="password"
              className="login-form-input"
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
            className="password-visibility"
            onClick={
              () => setPassVisibility((prevState) => !prevState) } />
        </section>
          {invalidFields.inexistentUser
            && <p style={ { color: 'red' } }>
                There's nobody with this email in our database
              </p>}
            {invalidFields.wrongPassword
            && <p style={ { color: 'red' } }>
                Wrong password
              </p>}
        <button
          onClick={ logButton }
          type="button"
          className="login-form-button"
          disabled={
            !(user.email.includes('@')
            && user.email.includes('.com')
            && user.password.length >= MIN_PASS_LENGTH)
          }
        >Log In</button>
        <button onClick={ () => navigate('/signin') }
        className="login-form-button">
          Create account
        </button>
      </form>
    </>
  );
}

export default Login;
