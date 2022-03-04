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
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="wave-top"><path fill="#582d58" fillOpacity="1" d="M0,224L40,197.3C80,171,160,117,240,128C320,139,400,213,480,234.7C560,256,640,224,720,176C800,128,880,64,960,58.7C1040,53,1120,107,1200,138.7C1280,171,1360,181,1400,186.7L1440,192L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z" ></path></svg>
      <h1 className="login-h1">Log-In</h1>
      <form className='login-form'>
        <label htmlFor="user-email">
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
          <label htmlFor="password">
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
