import { useSelector } from "react-redux";

export default function Header() {
  const store = useSelector(({ user: { email } }) => ({
    email,
  }));  

  return (
    <header>
      <h1>{ store.email }</h1>
    </header> 
  );
}