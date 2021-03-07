
const initialState = {
  company: null
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_STATE_CHANGED': {
      return {
        ...state,
        company: "hi"
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default reducer
