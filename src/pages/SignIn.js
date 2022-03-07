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
      <form className="create_account-form">
        <h1 className="create_account-h1">Sign-In</h1>
        <label className="login-form-input__label" htmlFor="user-email">
          Email
          <input
            id="email"
            data-testid="email-input"
            onChange={ inputHandler }
            className="create_account-form-input"
          />
        </label>
        <label  className="login-form-input__label" htmlFor="user-email">
          Username
          <input
            id="userName"
            data-testid="username-input"
            onChange={ inputHandler }
            className="create_account-form-input"
          />
        </label>
        <section className="password-section">
          <label className="login-form-input__label" htmlFor="password">
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