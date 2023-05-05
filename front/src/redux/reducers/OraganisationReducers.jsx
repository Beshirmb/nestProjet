import {
  GET_ORGANISATION_SUCCESS,
  GET_ORGANISATION_FAIL,
  UPDATE_ORGANISATION_SUCCESS,
  UPDATE_ORGANISATION_FAIL,
} from "../constants/OraginsationConstant";

const GetOrganisation = {
  message: "",
  error:""
};


export const GetOrganisationReducers = (state = GetOrganisation, action) => {
  
  switch (action.type) {

    case GET_ORGANISATION_SUCCESS:
      return { ...state,
          message: action.payload };

    case GET_ORGANISATION_FAIL:
      return { ...state,
          error: action.payload };

    case UPDATE_ORGANISATION_SUCCESS:
      return { ...state, 
        message: action.payload };

    case UPDATE_ORGANISATION_FAIL:
      return { ...state, 
        message: action.payload };

    default:
      return state;
  }
};
