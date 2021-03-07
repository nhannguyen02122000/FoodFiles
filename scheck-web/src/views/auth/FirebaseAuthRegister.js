import React, { useContext } from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import AuthContext from '../../contexts/FirebaseAuthContext'

const useStyles = makeStyles((theme) => ({
  root: {},
  inputText: {
    borderRadius: "30px"
  },
  googleButton: {
    borderRadius: "30px",
    backgroundColor: "white"
  },
  providerIcon: {
    marginRight: theme.spacing(2)
  },
  divider: {
    flexGrow: 1
  },
  dividerText: {
    margin: theme.spacing(1)
  },
  submitButton: {
    borderRadius: "30px",
    background: 'linear-gradient(225deg, #2a9df4 30%, #03254c 90%)',
    color: "white"
  },
}));

const FirebaseAuthRegister = ({ className, ...rest }) => {
  const classes = useStyles();
  const { createUserWithEmailAndPassword, signInWithGoogle } = useContext(AuthContext);
  const isMountedRef = useIsMountedRef();

  const handleGoogleClick = async () => {
    try {
      await signInWithGoogle();
    }
    catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          fullname: '',
          policy: true,
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().min(7).max(255).required('Password is required'),
          fullname: Yup.string().min(1).max(255).required('Full name is required'),
          policy: Yup.boolean().oneOf([true], 'This field must be checked')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await createUserWithEmailAndPassword(values.email, values.password);

            if (isMountedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
          }
          catch (err) {
            console.error(err);
            if (isMountedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form
            noValidate
            className={clsx(classes.root, className)}
            onSubmit={handleSubmit}
            {...rest}
          >
            <TextField
              error={Boolean(touched.fullname && errors.fullname)}
              fullWidth
              helperText={touched.fullname && errors.fullname}
              label="Full name"
              margin="normal"
              name="fullname"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={values.fullname}
              variant="outlined"
              InputProps={{ className: classes.inputText }}
            />
            <TextField
              error={Boolean(touched.email && errors.email)}
              fullWidth
              helperText={touched.email && errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              value={values.email}
              variant="outlined"
              InputProps={{ className: classes.inputText }}
            />
            <TextField
              error={Boolean(touched.password && errors.password)}
              fullWidth
              helperText={touched.password && errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
              variant="outlined"
              InputProps={{ className: classes.inputText }}
            />
            <Box
              alignItems="center"
              display="flex"
            >
              <Checkbox
                checked={values.policy}
                name="policy"
                onChange={handleChange}
                color="#03254c"
              />
              <Typography
                variant="body2"
                color="textSecondary"
              >
                I have read the
                {' '}
                <Link
                  component="a"
                  href="#"
                  color="#03254c"
                >
                  Terms and Conditions
                </Link>
              </Typography>
            </Box>
            {Boolean(touched.policy && errors.policy) && (
              <FormHelperText error>
                {errors.policy}
              </FormHelperText>
            )}
            {errors.submit && (
              <Box mt={3}>
                <FormHelperText error>
                  {errors.submit}
                </FormHelperText>
              </Box>
            )}
            <Box mt={2}>
              <Button
                className={classes.submitButton}
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Register
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <Box
        alignItems="center"
        display="flex"
        mt={2}
      >
        <Divider
          className={classes.divider}
          orientation="horizontal"
        />
        <Typography
          color="textSecondary"
          variant="body1"
          className={classes.dividerText}
        >
          OR
        </Typography>
        <Divider
          className={classes.divider}
          orientation="horizontal"
        />
      </Box>
      <Button
        className={classes.googleButton}
        fullWidth
        onClick={handleGoogleClick}
        size="large"
        variant="contained"
      >
        <img
          alt="Google"
          className={classes.providerIcon}
          src="/Image/google.svg"
        />
        Register with Google
      </Button>
    </>
  );
};

export default FirebaseAuthRegister;
