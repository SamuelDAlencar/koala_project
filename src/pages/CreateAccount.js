import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MIN_PASS_LENGTH } from '../consts';

export default function CreateAccount() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    email: '',
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

  const createAccount = () => {
    const { email } = newUser;
    const userAccount = JSON.parse(localStorage.getItem(email));

    if (!userAccount) {
      localStorage.setItem(email, JSON.stringify(newUser));
      navigate('/');
    }

    if (userAccount) {
      setUserExists(!userExists);
      setTimeout(() =>
        setUserExists(false), 5000)
    }
  }

  return (
    <>
      <h1>Create account</h1>
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
            () => setPassVisibility(!passVisibility) } />
        <button
          onClick={ createAccount }
          type="button"
          disabled={
            !(newUser.email.includes('@')
            && newUser.email.includes('.com')
            && newUser.password.length >= MIN_PASS_LENGTH)
          }
        >Create account</button>
        <button onClick={ () => navigate('/') }>Log In</button>
        {userExists
        && <p style={ { color: 'red' } }>This user already exists</p>}
      </form>
    </>
  );
}