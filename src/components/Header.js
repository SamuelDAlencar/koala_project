import { useSelector } from "react-redux";

export default function Header() {
  const store = useSelector(({ user: { email } }) => ({
    email,
  }));
  const { userName } = JSON.parse(localStorage.getItem(store.email));

  return (
    <header>
      <h1>{`Hey, ${userName}!`}</h1>
    </header> 
  );
}