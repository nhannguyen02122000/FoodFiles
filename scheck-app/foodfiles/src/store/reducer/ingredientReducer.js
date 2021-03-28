import * as actionType from "./actionTypes"

const initialState = {
  ingredients: [],
};
const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_INGREDIENTS: {
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          ...action.payload
        ]
      };
    }
    default: {
      return { ...state }
    }
  }
};

export default ingredientReducer

export const setIngredients = ingLst => {
  return dispatch => {
    dispatch({
      type: actionType.SET_INGREDIENTS,
      payload: ingLst
    })
  }
}