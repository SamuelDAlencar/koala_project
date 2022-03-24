import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAction } from '../redux/actions';
import { MIN_PASS_LENGTH } from '../consts';
import {
  Button,
  TextField,
  Typography,
  ThemeProvider,
  createTheme,
  Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import '../css/Login.css';

function Login() {
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
      marginTop: "20px",
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
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: '',
    userName: '',
    password: '',
  });
  const [passVisibility, setPassVisibility] = useState(false);
  const [invalidFields, setInvalidFields] = useState({
    wrongPassword: false,
    inexistentUser: false,
  });

  const inputHandler = ({ target: { id, value } }) => {
    setUser((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }

  const logButton = () => {
    const { email, password } = user;
    const userAccount = JSON.parse(localStorage.getItem(email));
    
    if (userAccount
      && password === userAccount.password) {
      dispatch(loginAction(user));
      navigate('/');
    } else if (!userAccount) {
      setInvalidFields({ wrongPassword: false, inexistentUser: true });
      setTimeout(() =>
      setInvalidFields((prevState) => ({ ...prevState, inexistentUser: false })), 5000)
    } else if (password !== userAccount.password) {
      setInvalidFields({ inexistentUser: false, wrongPassword: true });
      setTimeout(() =>
      setInvalidFields((prevState) => ({ ...prevState, wrongPassword: false })), 5000)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container
        className={classes.container}
        maxWidth="xl"
      >
        <Typography
          variant="h2"
          className={classes.title}
        >Log-In</Typography>
        <Container
          className={classes.inputSection}
          disableGutters
        >
          <TextField
            label="Email"
            autoComplete="off"
            placeholder="yourEmail@hotmail.com"
            type="email"
            className={classes.input}
            InputProps={{
              className: classes.input}}
            id="email"
            data-testid="email-input"
            onChange={ inputHandler }
          />
        </Container>
        <Container
          className={classes.inputSection}
          disableGutters
        >
            <TextField
              label="password"
              className={classes.input}
              InputProps={{
                className: classes.input}}
              id="password"
              data-testid="password-input"
              type={
                passVisibility
                ? 'text'
                : 'password'
              }
              onChange={ inputHandler }
            />
          <input
            type="checkbox"
            className="password-visibility"
            onClick={
              () => setPassVisibility((prevState) => !prevState) } />
        </Container>
          {invalidFields.inexistentUser
            && <p style={ { color: 'red' } }>
                There's nobody with this email in our database
              </p>}
            {invalidFields.wrongPassword
            && <p style={ { color: 'red' } }>
                Wrong password
              </p>}
          <Container className={classes.buttonSection}>
            <Button
              style={{ marginTop: "100px" }}
              size="large"
              color="primary"
              variant="contained"
              onClick={ logButton }
              type="button"
              className={classes.buttons}
              disabled={
                !(user.email.includes('@')
                && user.email.includes('.com')
                && user.password.length >= MIN_PASS_LENGTH)
              }
            >Log In</Button>
          <Button
            size="large"
            onClick={ () => navigate('/signin') }
            className={classes.buttons}
            color="primary"
            variant="outlined"
          >
            Create account
          </Button>
          <Button
            className={classes.buttons}
            size="small"
            style={{padding: "5px", textDecoration: "underline", color: "#00ADB5"}}
          >
            I forgot my password
          </Button>
        </Container>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
