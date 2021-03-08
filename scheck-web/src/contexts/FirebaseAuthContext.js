import React, {
  createContext,
  useEffect,
  useReducer
} from 'react';
import LoadingScreen from "../components/LoadingScreen"
import firebase from "../db/firebase"
import { useDispatch } from "../store";
import { userRef } from "../store/query";
import { setUser } from "../store/reducer/userReducer"

const initialAuthState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_STATE_CHANGED': {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialAuthState,
  method: 'FirebaseAuth',
  createUserWithEmailAndPassword: () => Promise.resolve(),
  signInWithEmailAndPassword: () => Promise.resolve(),
  signInWithGoogle: () => Promise.resolve(),
  logout: () => Promise.resolve()
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);
  const redux_dispatch = useDispatch();

  const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const createUserWithEmailAndPassword = async (email, password) => {
    console.log(email, password)
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return firebase.auth().signOut();
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        let doc = null
        try {
          doc = await userRef.doc(user.uid).get()
        }
        catch (err) {
          return
        }
        if (!doc.exists) {
          console.log('Permission error');
          await logout();
        }
        else {
          const user_data = {
            id: user.uid,
            email: user.email,
            name: user.fullname || user.email,
            token: await user.getIdToken(true),
          }
          dispatch({
            type: 'AUTH_STATE_CHANGED',
            payload: {
              isAuthenticated: true,
              user: user_data
            }
          })
          redux_dispatch(setUser({
            id: user.uid,
            email: user.email,
            name: user.fullname || user.email,
            role: doc.data().role
          }))
        }
      }
      else {
        dispatch({
          type: 'AUTH_STATE_CHANGED',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    });
    return unsubscribe;
  }, [dispatch, redux_dispatch]);

  if (!state.isInitialised) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'FirebaseAuth',
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signInWithGoogle,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
