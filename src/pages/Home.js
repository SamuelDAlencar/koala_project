/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../redux/actions";
import Header from "../components/Header";
import { Card, CardContent, CardMedia, Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

function Home() {
  const useStyles = makeStyles({
    card: {
      maxWidth: 345,
      boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
      backgroundColor: "#fafafa",
      marginBottom: "5%",
    },
    media: {
      height: 300,
    },
  })
  const classes = useStyles();

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
      <Container>
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
            <Card
              key={product.id}
              className={classes.card}
            >
              <CardContent>{product.title}</CardContent>
              <CardMedia className={classes.media} image={product.thumbnail} />
            </Card>
          )}
        </ul>
      </Container>
    </>
  );
}

export default Home;
