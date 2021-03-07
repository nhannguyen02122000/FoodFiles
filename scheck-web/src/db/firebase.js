import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import "firebase/firestore";
import "firebase/functions";
import "firebase/analytics";
import { firebaseConfig } from '../config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
export const firebaseFunction = firebase.app().functions(process.env.REACT_APP_REGION);
export const analytics = firebase.analytics();
