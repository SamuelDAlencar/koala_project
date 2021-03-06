import { Button, Container, createTheme, makeStyles, TextField, ThemeProvider, Typography } from "@material-ui/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MIN_PASS_LENGTH } from '../consts';
import '../css/SignIn.css'

export default function SignIn() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#00ADB5'
      }
    }
  });

  const useStyles = makeStyles({
    title: {
      color: '#EEEEEE',
      margin: "100px 0 70px",
    },

    inputSection: {
      display: "flex",
      width: "90%",
      maxWidth: "500px",
      justifyContent: "center",
      alignItems: "center",
      margin: "15px 0 0 0",
    },

    input: {
      width: "100%",
      color: "#EEEEEE",
      fontSize: "100%",
    },

    buttonSection: {
    },

    buttons: {
      width: "60%",
      maxWidth: "300px",
      fontSize: "85%",
      padding: "15px",
      marginTop: "100px",
    },

    container: {
      borderRadius: "0",
      height: '100vh',
      width: '100vw',
      backgroundColor: "#222831",
      color: "#EEEEEE",
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      alignItems: "center",
    },
  });
  const classes = useStyles();

  //---------------------------------------------------------------

  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    email: '',
    userName: '',
    password: '',
  });
  const [passVisibility, setPassVisibility] = useState(false);
  const [userExists, setUserExists] = useState(false);

  const inputHandler = ({ target: { id, value } }) => {
    setNewUser((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }

  const SignIn = () => {
    const { email } = newUser;
    const userAccount = JSON.parse(localStorage.getItem(email));

    if (!userAccount) {
      localStorage.setItem(email, JSON.stringify(newUser));
      navigate('/login');
    }

    if (userAccount) {
      setUserExists(!userExists);
      setTimeout(() =>
        setUserExists(false), 5000)
    }
  }

  return (
    <ThemeProvider theme={ theme }>
      <Container className={classes.container}>
      <Typography
          variant="h2"
          className={classes.title}
        >Sign-In</Typography>
        <Container className={classes.inputSection}>
          <TextField
            id="email"
            label="Email"
            autoComplete="off"
            placeholder="yourEmail@hotmail.com"
            data-testid="email-input"
            onChange={ inputHandler }
            className={classes.input}
            inputProps={{
              className: classes.input
            }}
            />
        </Container>
        <Container className={classes.inputSection}>
          <TextField
            label="Username"
            id="userName"
            data-testid="username-input"
            onChange={ inputHandler }
            className={classes.input}
            inputProps={{
              className: classes.input
            }}
            />
        </Container>
        <Container className={classes.inputSection}>
            <TextField
              label="password"
              id="password"
              data-testid="password-input"
              type={
                passVisibility
                ? 'text'
                : 'password'
              }
              onChange={ inputHandler }
              className={classes.input}
              inputProps={{
                className: classes.input
              }}
            />
          <input
            type="checkbox"
            className="password-visibility"
            onClick={
              () => setPassVisibility(!passVisibility) } />
        </Container>
        <Button
          size="large"
          color="primary"
          variant="contained"
          onClick={ SignIn }
          type="button"
          className={classes.buttons}
          disabled={
            !(newUser.email.includes('@')
            && newUser.email.includes('.com')
            && newUser.password.length >= MIN_PASS_LENGTH)
          }
        >Create account</Button>
        {userExists
        && <p style={ { color: 'red' } }>This user already exists</p>}
      </Container>
    </ThemeProvider>
  );
}