import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MIN_PASS_LENGTH } from '../consts';
import '../css/SignIn.css'

export default function SignIn() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    email: '',
    userName: '',
    password: '',
  });
  const [passVisibility, setPassVisibility] = useState(false);
  const [userExists, setUserExists] = useState(false);

  const inputHandler = ({ target: { id, value } }) => {
    setNewUser((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }

  const SignIn = () => {
    const { email } = newUser;
    const userAccount = JSON.parse(localStorage.getItem(email));

    if (!userAccount) {
      localStorage.setItem(email, JSON.stringify(newUser));
      navigate('/login');
    }

    if (userAccount) {
      setUserExists(!userExists);
      setTimeout(() =>
        setUserExists(false), 5000)
    }
  }

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="wave-top"><path fill="#582d58" fillOpacity="1" d="M0,224L40,197.3C80,171,160,117,240,128C320,139,400,213,480,234.7C560,256,640,224,720,176C800,128,880,64,960,58.7C1040,53,1120,107,1200,138.7C1280,171,1360,181,1400,186.7L1440,192L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z" ></path></svg>
      <h1 className="create_account-h1">Sign-In</h1>
      <form className="create_account-form">
        <label htmlFor="user-email">
          Email
          <input
            id="email"
            data-testid="email-input"
            onChange={ inputHandler }
            className="create_account-form-input"
          />
        </label>
        <label htmlFor="user-email">
          Username
          <input
            id="userName"
            data-testid="username-input"
            onChange={ inputHandler }
            className="create_account-form-input"
          />
        </label>
        <section className="password-section">
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
              className="create_account-form-input"
              />
          </label>
          <input
            type="checkbox"
            className="password-visibility"
            onClick={
              () => setPassVisibility(!passVisibility) } />
        </section>
        <button
          onClick={ SignIn }
          type="button"
          className="login-form-button"
          disabled={
            !(newUser.email.includes('@')
            && newUser.email.includes('.com')
            && newUser.password.length >= MIN_PASS_LENGTH)
          }
        >Create account</button>
        {userExists
        && <p style={ { color: 'red' } }>This user already exists</p>}
      </form>
    </>
  );
}