/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../redux/actions";
import Header from "../components/Header";
import {
  Container,
  createTheme,
  Grid,
  Box,
  ThemeProvider } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Footer from "../components/Footer";

function Home() {
  const useStyles = makeStyles({
    card: {
      boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
      backgroundColor: "#fafafa",
      width: "100%",
      height: "320px",
    },
    media: {
      width: "100%",
      height: "80%",
    },
    input: {
      width: "70%",
      color: "#EEEEEE",
      fontSize: "140%",
    },
    buttons: {
      width: "30%",
      fontSize: "100%",
    },
    searchContainer: {
      marginTop: "110px",
      display: "flex",
      width: "100%",
    },
    cards: {
    }
  })
  const classes = useStyles();

  const theme = createTheme({
    palette: {
      primary: {
        main: '#00ADB5'
      }
    }
  });

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
    <ThemeProvider theme={ theme }>
      <Header />
      <Container>
        <Grid
          container
          spacing={6}
        >
          {store.products
            && store.products.map((product) => 
            <Grid
              xs={12}
              sm={6}
              md={4}
              lg={3}
              item
              key={product.id}
            >
              <Box
                className={classes.card}
              >
                <img className={classes.media} alt={product.title} src={product.thumbnail} />
                <h2>{product.title}</h2>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
      {/* <Footer /> */}
    </ThemeProvider>
  );
}

export default Home;
