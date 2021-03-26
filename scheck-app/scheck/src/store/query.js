import firestore from '@react-native-firebase/firestore'

export const userRef = firestore().collection('user')
export const ingredientRef = firestore().collection('ingredient')
export const autoNumIngredientRef = firestore().collection('autonumber').doc('ingredient')
export const qoutesRef = firestore().collection('qoutes').doc('qoutesDoc')
export const healthArtRef = firestore().collection('article').doc('Health').collection('HealthCollection')
export const dietArcRef = firestore().collection('article').doc('Diet').collection('DietCollection')
export const nutriArcRef = firestore().collection('article').doc('Nutri').collection('NutriCollection')