import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
  IconButton
} from '@material-ui/core';
import { Menu } from "@material-ui/icons";
import '../css/Header.css';
import { AccountCircleRounded } from "@material-ui/icons";

export default function Header() {
  const useStyles = makeStyles({
    toolBar: {
      backgroundColor: "#222831",
      display: "flex",
      justifyContent: "space-around",
    },

    icon: {
      transform: "scale(1.8)",
      color: "#EEEEEE",
    }
  });
  const classes = useStyles();

  const navigate = useNavigate();
  const store = useSelector(({ user: { email } }) => ({
    email,
  }));
  const [user, setUser] = useState();

  useEffect(() => {
    if (store.email) {
      setUser(JSON.parse(localStorage.getItem(store.email)).userName);
    }
  }, []);

  return (
    <AppBar>
      <Toolbar className={ classes.toolBar }>
        <IconButton>
          <AccountCircleRounded className={ classes.icon } />
        </IconButton>
        {user
          ?
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h4"
            align="center"
          >
            {`Hey, ${user}!`}
          </Typography> 
          : (
          <>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="button"
              onClick={ () => navigate('/login') }
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="button"
              onClick={ () => navigate('/signin') }
            >
            Create account
          </Button>
          </>)
        }
        <IconButton>
          <Menu className={ classes.icon } />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}