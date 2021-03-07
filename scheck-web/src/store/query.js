import firebase from '../db/firebase';
// import history from '../history'

export const userRef = firebase.firestore()
  .collection('user')