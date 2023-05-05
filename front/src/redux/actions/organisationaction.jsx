import {
  GET_ORGANISATION_SUCCESS,
  GET_ORGANISATION_FAIL,
  UPDATE_ORGANISATION_SUCCESS,
  UPDATE_ORGANISATION_FAIL,
} from "../constants/OraginsationConstant";

import * as ApiOrgainsation from "../../api/organisationapi";

export const GetOrganisation = (id) => async (dispatch) => {
  let token = await localStorage.getItem("jwt");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    ApiOrgainsation.getorganisation(id, config).then((res) =>
      dispatch({ type: GET_ORGANISATION_SUCCESS, payload: res.data })
    );
  } catch (err) {
    dispatch({
      type: GET_ORGANISATION_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
    alert(err);
  }
};

export const UpdateOrganisation = (data) => async (dispatch) => {
  let token = await localStorage.getItem("jwt");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    ApiOrgainsation.updategetorganisation(data, config)
      .then((res) =>
        dispatch({ type: UPDATE_ORGANISATION_SUCCESS, payload: data })
      )

      .catch((error) =>
        dispatch({ type: UPDATE_ORGANISATION_FAIL, payload: error })
      );
  } catch (err) {
    dispatch({
      type: UPDATE_ORGANISATION_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });

    alert(err);
  }
};
