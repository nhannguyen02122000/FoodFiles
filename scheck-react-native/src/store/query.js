import firestore from '@react-native-firebase/firestore'

export const userRef = firestore().collection('user')
export const ingredientRef = firestore().collection('ingredient')
export const autoNumIngredientRef = firestore().collection('autonumber').doc('ingredient')