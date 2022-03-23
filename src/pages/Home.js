/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../redux/actions";
import Header from "../components/Header";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  createTheme,
  Grid,
  TextField,
  ThemeProvider } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

function Home() {
  const useStyles = makeStyles({
    card: {
      boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
      backgroundColor: "#fafafa",
      margin: "15px",
      width: "30%",
    },
    media: {
      height: 300,
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
      marginTop: "100px",
      display: "flex",
      width: "100%",
      margin: "10% auto",
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
        <Container className={classes.searchContainer}>
          <TextField
            className={classes.input}
            variant="outlined"
            type="text"
            onChange={ inputHandler }
          />
          <Button
            className={classes.buttons}
            type="button"
            onClick={ searchButton }
          >
            Search
          </Button>
        </Container>
        <Grid container spacing={4}>
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
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default Home;
