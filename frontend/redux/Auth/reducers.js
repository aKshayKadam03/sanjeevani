import * as actionTypes from "./actionTypes";

let initState = {
  users: [],
  isLoading: false,
  isError: false,
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actionTypes.GET_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        users: action.payload,
      };
    }
    case actionTypes.GET_USER_FAILURE: {
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
