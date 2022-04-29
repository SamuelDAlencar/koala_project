// eslint-disable react-hooks/exhaustive-deps
import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/actions';
import Header from '../components/Header';
import {
  Container,
  createTheme,
  ThemeProvider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Product from '../components/Product';
// import Footer from "../components/Footer";

function Home() {
  const useStyles = makeStyles({
    homeContainer: {
      paddingTop: '70px',
      backgroundColor: '#393E46',
    },
    card: {
      boxShadow: '0 5px 8px 0 rgba(0, 0, 0, 0.3)',
      backgroundColor: '#fafafa',
      width: '100%',
      height: '320px',
      margin: '5% 0',
    },
    media: {
      width: '100%',
      height: '80%',
    }
  });
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
    products: storeData.products.results,
    toggleHome: storeData.toggleHome,
  }));

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      {store.toggleHome &&
        <Container className={classes.homeContainer}>
          {store.products
            && store.products.map((product) =>
              <Product key={product.id} product={product} />
            )}
        </Container>}
      {/* <Footer /> */}
    </ThemeProvider>
  );
}

export default Home;
