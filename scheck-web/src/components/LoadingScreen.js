import React from 'react';
import {
  Box,
  CircularProgress,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    minHeight: '100%',
    margin: "auto",
    padding: 100
  }
}));

const LoadingScreen = () => {
  const classes = useStyles();

  return (
    <div >
      <Box width={700} className={classes.root}>
        <CircularProgress size={150} />
      </Box>
    </div>
  );
};

export default LoadingScreen;
