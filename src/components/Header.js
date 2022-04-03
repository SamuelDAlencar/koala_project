import { TextField, makeStyles, createTheme, Button, ThemeProvider, Container, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, toggleHomeAction } from "../redux/actions";
import SearchIcon from '@mui/icons-material/Search';
import { AccountCircleRounded } from "@material-ui/icons";
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const useStyles = makeStyles({
    title: {
      color: "#EEEEEE",
      fontSize: "170%",
    },
    input: {
      color: "#EEEEEE",
      fontSize: "140%",
      marginRight: "5px",
    },
    icon: {
      transform: "scale(1.8)",
      color: "#EEEEEE",
    },
    headerContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: 'space-between',
      alignItems: "center",
      backgroundColor: "#222831",
      position: 'fixed',
      top: '0',
      left: '0',
      width: "100%",
      height: "60px",
      padding: "0",
    },
    searchContainer: {
      padding: "15px",
      display: "flex",
      justifyContent: 'space-between',
      alignItems: "center",
      width: "100%",
      height: "100%",
    },
    loginContainer: {
      backgroundColor: "#222831",
      padding: "20px",
    },
    loginButtonsContainer: {
      paddingBottom: "30px",
      display: "flex",
      justifyContent: 'space-between',
      alignItems: "center",
      width: "100%",
      height: "100%",
    },
  })
  const classes = useStyles();
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      primary: {
        main: '#00ADB5'
      }
    }
  });
  const [inputValue, setInputValue] = useState();
  const [toggleSearch, setToggleSearch] = useState(false);
  const [user, setUser] = useState();
  const [notLoggedOptions, setNotLoggedOptions] = useState(false);
  const dispatch = useDispatch();

  const store = useSelector(({ user: { email } }) => ({
    email,
  }));

  const inputHandler = ({ target: { value }}) => {
    setInputValue(value);
  }

  const searchButton = () => {
    dispatch(fetchProducts(inputValue));
    setToggleSearch(!toggleSearch);
    setNotLoggedOptions(false);
  } 
  
  useEffect(() => {
    dispatch(toggleHomeAction(!toggleSearch));
    setNotLoggedOptions(false);
  }, [toggleSearch]);

  return (
    <ThemeProvider theme={ theme }>
      <Container className={classes.headerContainer}>
        <Container className={classes.searchContainer}>
          {toggleSearch
          ? <TextField
              label="What we buying today?"
              className={classes.input}
              inputProps={{ className: classes.input }}
              type="text"
              onChange={ inputHandler }
            />
          : (
            <>
              <IconButton
                onClick={
                  store.email
                    ? null
                    : () => setNotLoggedOptions(!notLoggedOptions)
                }
              >
                <AccountCircleRounded className={ classes.icon } />
              </IconButton>
              <Typography className={ classes.title }>KOALA</Typography>
            </>)}
          <IconButton
            type="button"
            onClick={ toggleSearch ? () => searchButton() : () => setToggleSearch(!toggleSearch) }
          >
            <SearchIcon className={ classes.icon }/>
          </IconButton>
        </Container>
        {notLoggedOptions &&
          <Container className={ classes.loginContainer }>
            <Typography
              style={{color: "#EEEEEE"}}
            >Looks like you're not logged, already have an account? want to create one?</Typography>
          <Container className={ classes.loginButtonsContainer }>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="button"
              onClick={ () => navigate('/login') }
              style={{fontSize: "80%"}}
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="button"
              onClick={ () => navigate('/signin') }
              style={{fontSize: "80%"}}
            >
              Create account
            </Button>
          </Container>
        </Container>
        }
      </Container>
    </ThemeProvider>
  );
}
