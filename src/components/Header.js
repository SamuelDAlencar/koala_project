import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
    <header>
      {user
        ? <h1>{`Hey, ${user}!`}</h1>
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
            onClick={ () => navigate('/createaccount') }
          >
          Create account
        </button>
        </>)
      }
    </header> 
  );
}