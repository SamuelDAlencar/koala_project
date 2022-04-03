/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
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
    cards: {
    },
    homeContainer: {
      marginTop: "80px",
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
    products: storeData.products.results,
    toggleHome: storeData.toggleHome,
  }));

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <ThemeProvider theme={ theme }>
      <Header />
      {store.toggleHome &&
        <Container className={classes.homeContainer}>
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
        </Container>}
      {/* <Footer /> */}
    </ThemeProvider>
  );
}

export default Home;
