import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
} from "../constants/UserConstant";

import { signUp, signIn, updatepassword } from "../../api/index.js";

export const loginU = (dataO, id) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    signIn(dataO)

      .then((res) => {
        dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data });

        if (res.data && res.data.token) {
          localStorage.setItem("jwt", res.data.token);
        }
      })


      .catch((err) => console.log(err));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const registerU = (dataO) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    signUp(dataO)
      .then((res) => {
        dispatch({ type: USER_REGISTER_SUCCESS, payload: res.data });
      })

      .catch((err) => {
        dispatch({
          type: USER_REGISTER_FAIL,
          payload:
            err.response && err.response.data.message
              ? err.response.data.message
              : err.messageerr,
        });
      });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const UPpassword = (dataO) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    updatepassword(dataO)
      .then((res) => {
        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: UPDATE_PASSWORD_FAIL, payload: err.data });
      });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT });
};
