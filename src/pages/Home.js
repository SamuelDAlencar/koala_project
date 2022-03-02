import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import { fetchProducts } from "../redux/actions";

function Home() {
  const dispatch = useDispatch();
  const store = useSelector((storeData) => ({
    products: storeData.products.results
  }));

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <>
      <Header />
      <h1>Home</h1>
      <ul>
        {store.products.map((product) => 
          <li key={ product.id }>{ product.title }</li>  
        )}
      </ul>
    </>
  );
}

export default Home;
