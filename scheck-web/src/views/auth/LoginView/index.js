import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  makeStyles
} from '@material-ui/core';
import Page from "../../../components/page"
// import Logo from 'src/components/Logo';
import AuthContext from '../../../contexts/FirebaseAuthContext'
import FirebaseAuthLogin from './FirebaseAuthLogin';


const methodIcons = {
  'FirebaseAuth': '/Image/firebase.svg',
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    objectFit: "cover"
  },
  formInfo: {
    backgroundColor: "Azure",
    borderRadius: "0px 20px 20px 0px",
    padding: 40
  },
  imageContainer: {
    padding: "12%",
    backgroundColor: "DarkBlue",
    borderRadius: "20px 0px 0px 20px",
    display: "flex",
    alignItems: "center",
    minHeight: 400
  },
  cardContainer: {
    paddingBottom: 40,
    paddingTop: 40,
  },
  currentMethodIcon: {
    height: 40,
    '& > img': {
      width: 'auto',
      maxHeight: '100%'
    }
  }
}));

const LoginView = () => {
  const classes = useStyles();
  const { method } = useContext(AuthContext);

  return (
    <Page
      className={classes.root}
      title="login"
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

            <Box
              alignItems="center"
              display="flex"
              justifyContent="space-between"
              mb={3}
            >
              <Button>A</Button>
              <Button>B</Button>
            </Box>
            <Box
              flexGrow={1}
              mt={3}
            >
              <FirebaseAuthLogin />
            </Box>
            <Box my={3}>
              <Divider />
            </Box>
            <Link
              component={RouterLink}
              to="/register"
              variant="body2"
              color="textSecondary"
            >
              Create new account
            </Link>

          </Grid>
        </Grid>

      </Container>
    </Page>
  );
};

export default LoginView;
