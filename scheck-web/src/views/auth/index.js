import React, { useState } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import {
  ToggleButton,
  ToggleButtonGroup,
} from '@material-ui/lab';
import Page from "../../components/page"
import FirebaseAuthLogin from './FirebaseAuthLogin'
import FirebaseAuthRegister from './FirebaseAuthRegister'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    objectFit: "cover",
    backgroundColor: "#2a9df4"
  },
  formInfo: {
    backgroundColor: "#d0efff",
    borderRadius: "0px 20px 20px 0px",
    padding: 40
  },
  imageContainer: {
    padding: "12%",
    backgroundImage: `url(/Image/lelftBgAuthPage.svg)`,
    backgroundPosition: "left bottom",
    borderRadius: "20px 0px 0px 20px",
    display: "flex",
    alignItems: "center",
    minHeight: "93vh"
  },
  cardContainer: {
    paddingBottom: 20,
    paddingTop: 20,
    minHeight: "100vh"
  },
  currentMethodIcon: {
    height: 40,
    '& > img': {
      width: 'auto',
      maxHeight: '100%'
    }
  },
  buttonGroup: {
    margin: "25px 0 0 0",
    width: "1000px",
    maxWidth: "100%"
  },
  loginBtn: {
    borderRadius: "20px 0px 0px 20px",
    width: "50%",
    backgroundColor: 'rgba(0,0,30,0.4)',
    color: "white"
  },
  registerBtn: {
    borderRadius: "0px 20px 20px 0px",
    width: "50%",
    backgroundColor: 'rgba(0,0,30,0.4)',
    color: "white"
  },
  selectedBtn: {
    backgroundColor: "#03254c !important",
    color: "white !important",
  }
}));

const LoginView = () => {
  const classes = useStyles()
  const [status, setStatus] = useState('login')

  const handleChoose = (event, newStatus) => {
    if (!newStatus) return
    setStatus(newStatus);
  };
  return (
    <Page
      className={classes.root}
      title="Auth"
    >
      <Container
        maxWidth="md"
        className={classes.cardContainer}
      >
        <Grid
          container
        >
          <Grid
            item
            xs={6}
            className={classes.imageContainer}
          >
            <img
              alt="imgAuthPage"
              src="/Image/login.svg"
            />
          </Grid>
          <Grid
            item
            xs={6}
            className={classes.formInfo}
          >
            <ToggleButtonGroup
              value={status}
              exclusive
              onChange={handleChoose}
              classes={{ root: classes.buttonGroup }}
            >
              <ToggleButton
                value="login"
                classes={{
                  root: classes.loginBtn,
                  selected: classes.selectedBtn
                }}
              >
                Login
              </ToggleButton >
              <ToggleButton
                value="register"
                classes={{
                  root: classes.registerBtn,
                  selected: classes.selectedBtn
                }}
              >
                Register
              </ToggleButton >
            </ToggleButtonGroup>
            {status === "login" ? <FirebaseAuthLogin /> : <FirebaseAuthRegister />}
          </Grid>
        </Grid>

      </Container>
    </Page>
  );
};

export default LoginView;
