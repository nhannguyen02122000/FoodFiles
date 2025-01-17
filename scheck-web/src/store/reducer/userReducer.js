import * as actionType from "./actionTypes"

const initialState = {
  user: null,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_USER: {
      return {
        ...state,
        user: { ...action.payload.user }
      };
    }
    default: {
      return { ...state }
    }
  }
};

export default userReducer

export const setUser = user_data => {
  return dispatch => {
    dispatch({
      type: actionType.SET_USER,
      payload: {
        user: user_data
      }
    })
  }
}
