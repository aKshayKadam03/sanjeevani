import * as actionTypes from "./actionTypes";
import axios from "axios";

const getUsersRequest = () => {
  return {
    type: actionTypes.GET_USER_REQUEST,
  };
};

const getUsersSuccess = (data) => {
  return {
    type: actionTypes.GET_USER_SUCCESS,
    payload: {
      data,
    },
  };
};

const getUsersFailure = (error) => {
  return {
    type: actionTypes.GET_USER_FAILURE,
    payload: {
      error: error,
    },
  };
};

const getCurrent = (data) => {
  return {
    type: actionTypes.GET_CURRENT_USER,
    payload: {
      data,
    },
  };
};

export const getUsers = () => async (dispatch) => {
  dispatch(getUsersRequest());
  return axios
    .get("http://localhost:8080/user")
    .then((response) => {
      const users = response.data;
      dispatch(getUsersSuccess(users));
    })
    .catch((error) => {
      dispatch(getUsersFailure(error));
    });
};

export const getCurrentUser = (i) => (dispatch) => {
  dispatch(getCurrent(i));
};
