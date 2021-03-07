import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../contexts/FirebaseAuthContext';

const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Redirect to="/auth" />;
  }

  return (
    <>
      {children}
    </>
  );
};


export default AuthGuard;
