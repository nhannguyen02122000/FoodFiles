import firebase from '../db/firebase';
// import history from '../history'

export const userRef = firebase.firestore().collection('user')
export const ingredientRef = firebase.firestore().collection('ingredient')
export const autoNumIngredientRef = firebase.firestore().collection('autonumber').doc('ingredient')