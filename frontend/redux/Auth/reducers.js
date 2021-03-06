import * as actionTypes from "./actionTypes";

let initState = {
  users: [],
  isAuth: false,
  isLoading: false,
  isError: false,
  currentUser: [],
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

    case actionTypes.GET_CURRENT_USER: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isAuth: true,
        currentUser: action.payload,
      };
    }

    case actionTypes.LOGOUT_USER: {
      return {
        ...state,
        isAuth: false,
        currentUser: [],
      };
    }

    default: {
      return state;
    }
  }
};

export default authReducer;
