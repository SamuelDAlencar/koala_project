import { TextField, makeStyles, createTheme, Button, ThemeProvider, Container } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from "../redux/actions";
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';

export default function Header() {
  const useStyles = makeStyles({
    input: {
      width: "80%",
      color: "#EEEEEE",
      fontSize: "140%",
      marginRight: "15px",
    },
    buttons: {
      backgroundColor: "transparent",
      border: "0",
      width: "20%",
      fontSize: "100%",
    },
    icon: {
      transform: "scale(1.8)",
    },
    searchContainer: {
      backgroundColor: "#EEEEEE",
      padding: "15px",
      display: "flex",
      width: "100%",
      marginBottom: "5%",
      boxShadow: "5px 10px 15px #EEEEEE",
    },
  })
  const classes = useStyles();

  const theme = createTheme({
    palette: {
      primary: {
        main: '#00ADB5'
      }
    }
  });
  const [inputValue, setInputValue] = useState();
  const dispatch = useDispatch();

  const inputHandler = ({ target: { value }}) => {
    setInputValue(value);
  }

  const searchButton = () => {
    dispatch(fetchProducts(inputValue));
  } 

  return (
    <ThemeProvider theme={ theme }>
      <Container className={classes.searchContainer}>
        <TextField
          className={classes.input}
          inputProps={{ className: classes.input }}
          type="text"
          onChange={ inputHandler }
          />
        <Button
          className={classes.buttons}
          type="button"
          onClick={ searchButton }
          variant="contained"
          >
          <IconButton>
            <SearchIcon className={ classes.icon }/>
          </IconButton>
        </Button>
      </Container>
    </ThemeProvider>
  );
}
