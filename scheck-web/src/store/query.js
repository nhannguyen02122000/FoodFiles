import firebase from '../db/firebase';
// import history from '../history'

export const companyRef = firebase.firestore()
  .collection('company')
  .doc(window.location.hostname)