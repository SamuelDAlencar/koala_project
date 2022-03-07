import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import '../css/Header.css';

export default function Header() {
  const navigate = useNavigate();
  const store = useSelector(({ user: { email } }) => ({
    email,
  }));
  const [user, setUser] = useState();

  useEffect(() => {
    if (store.email) {
      setUser(JSON.parse(localStorage.getItem(store.email)).userName);
    }
  }, []);

  return (
    <header className="header">
      <img
        alt="user_icon"
        src="https://img.icons8.com/fluency-systems-regular/48/000000/user.png"
        className="user_icon__img"
      />
      {user
        ? <h1 className="user__h1">{`Hey, ${user}!`}</h1>
        : (
        <>
          <button
            type="button"
            onClick={ () => navigate('/login') }
          >
            Login
          </button>
          <button
            type="button"
            onClick={ () => navigate('/signin') }
          >
          Create account
        </button>
        </>)
      }
      <img
        alt="options_icon"
        className="options_icon"
        src="https://img.icons8.com/ios/50/000000/bulleted-list.png"
      />
    </header> 
  );
}