import * as ConstantUser from "../constants/UserProfileConstant";

import * as ApiUser from "../../api/profilapi";

export const GetUserProfile = (id) => async (dispatch) => {
  let token = await localStorage.getItem("jwt");
  let config = {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  };

  try {
    ApiUser.getuserconnected(id, config).then((res) =>
      dispatch({
        type: ConstantUser.GET_USER_PROFILE_SUCCESS,
        payload: res.data,
      })
    );
  } catch (err) {
    dispatch({
      type: ConstantUser.GET_USER_PROFILE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
    alert(err);
  }
};

export const UpdateUserProfile = (data) => async (dispatch) => {
  let token = await localStorage.getItem("jwt");
  let config = {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  };

  try {
    dispatch({
      type: ConstantUser.UPDATE_USER_PROFILE_REQUEST,
    });

    ApiUser.updateprofil(data, config)

      .then((res) =>
        dispatch({
          type: ConstantUser.UPDATE_USER_PROFILE_SUCCESS,
          payload: data,
        })
      )

      .catch((error) =>
        dispatch({
          type: ConstantUser.UPDATE_USER_PROFILE_FAIL,
          payload: error,
        })
      );
  } catch (err) {
    dispatch({
      type: ConstantUser.UPDATE_USER_PROFILE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
    alert(err);
  }
};

export const UpdatePasswordProfile = (data) => async (dispatch) => {
  try {
    dispatch({
      type: ConstantUser.UPDATE_PASSWORD_USER_REQUEST,
    });
    ApiUser.updatepassword(data)

      .then((res) =>
        dispatch({
          type: ConstantUser.UPDATE_PASSWORD_USER_SUCCESS,
          payload: data,
        })
      )

      .catch((error) =>
        dispatch({
          type: ConstantUser.UPDATE_PASSWORD_USER_FAIL,
          payload: error,
        })
      );
  } catch (err) {
    dispatch({
      type: ConstantUser.UPDATE_PASSWORD_USER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
    alert(err);
  }
};

export const UpdatePhotoProfile = (data) => async (dispatch) => {
  try {
    dispatch({
      type: ConstantUser.UPDATE_PHOTO_USER_REQUEST,
    });
    ApiUser.addimagefile(data)

      .then((res) =>
        dispatch({
          type: ConstantUser.UPDATE_PHOTO_USER_SUCCESS,
          payload: data,
        })
      )

      .catch((error) =>
        dispatch({
          type: ConstantUser.UPDATE_PHOTO_USER_SUCCESS,
          payload: error,
        })
      );
  } catch (err) {
    dispatch({
      type: ConstantUser.UPDATE_PHOTO_USER_SUCCESS,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
    alert(err);
  }
};
