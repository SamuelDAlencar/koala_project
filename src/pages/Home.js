/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import { fetchProducts } from "../redux/actions";

function Home() {
  const dispatch = useDispatch();
  const store = useSelector((storeData) => ({
    products: storeData.products.results
  }));
  const [inputValue, setInputValue] = useState();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const inputHandler = ({ target: { value }}) => {
    setInputValue(value);
  }

  const searchButton = () => {
    dispatch(fetchProducts(inputValue));
  } 

  return (
    <>
      <Header />
      <h1>Home</h1>
      <input
        type="text"
        onChange={ inputHandler }
      />
      <button
        type="button"
        onClick={ searchButton }
      >
        Search
      </button>
      <ul>
        {store.products
          && store.products.map((product) => 
          <>
            <li key={product.id}>{product.title}</li>
            <img alt="thumbnail" src={product.thumbnail} />
          </>
        )}
      </ul>
    </>
  );
}

export default Home;
