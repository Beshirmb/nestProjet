import {
  GET_FOURNISSEUR_REQUEST,
  GET_FOURNISSEUR_SUCCESS,
  GET_FOURNISSEUR_FAIL,
  ADD_FOURNISSEUR_REQUEST,
  ADD_FOURNISSEUR_SUCCESS,
  ADD_FOURNISSEUR_FAIL,
  UPDATE_FOURNISSEUR_REQUEST,
  UPDATE_FOURNISSEUR_SUCCESS,
  UPDATE_FOURNISSEUR_FAIL,
  DELETE_FOURNISSEUR_REQUEST,
  DELETE_FOURNISSEUR_SUCCESS,
  DELETE_FOURNISSEUR_FAIL,
  SEARCH_FOURNISSEUR_REQUEST,
  SEARCH_FOURNISSEUR_SUCCESS,
  SEARCH_FOURNISSEUR_FAIL,
  
} from "../constants/FOURNISSEURConstant";

import * as ApiFournisseur from "../../api/FournisseurApi.jsx";

/* get FOURNISSEUR */
export const GETFournisseur = (data) => async (dispatch) => {
 
  try {
    dispatch({ type: GET_FOURNISSEUR_REQUEST });
    ApiFournisseur.GET_Fournisseur(data);
    dispatch({ type: GET_FOURNISSEUR_SUCCESS, payload: data });
  
  } catch (error) {
    dispatch({
      type: GET_FOURNISSEUR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
/* add FOURNISSEUR */
export const AddFournisseur = (data) => async (dispatch) => {
 
  try {
    dispatch({ type: ADD_FOURNISSEUR_REQUEST });
    ApiFournisseur.Add_Fournisseur(data);
    dispatch({ type: ADD_FOURNISSEUR_SUCCESS, payload: data });
  
  } catch (error) {
    dispatch({
      type: ADD_FOURNISSEUR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/* update FOURNISSEUR */

export const UpdateFournisseur = (data) => async (dispatch) => {

  try {
    dispatch({ type: UPDATE_FOURNISSEUR_REQUEST });
    ApiFournisseur.Update_Fournisseur(data);
    dispatch({ type: UPDATE_FOURNISSEUR_SUCCESS, payload: data });
   
  } catch (error) {
    dispatch({
      type: UPDATE_FOURNISSEUR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/* delete FOURNISSEUR */

export const DeleteFournisseur = (data) => async (dispatch) => {
 
  try {
    dispatch({ type: DELETE_FOURNISSEUR_REQUEST });
    ApiFournisseur.Delete_Fournisseur(data);
    dispatch({ type: DELETE_FOURNISSEUR_SUCCESS, payload: data });
  
  } catch (error) {
    dispatch({
      type: DELETE_FOURNISSEUR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/* Search FOURNISSEUR */

export const SearchFournisseur = (data) => async (dispatch) => {
  
  try {
    dispatch({ type: SEARCH_FOURNISSEUR_REQUEST });
    ApiFournisseur.Search_Fournisseur(data);
    dispatch({ type: SEARCH_FOURNISSEUR_SUCCESS, payload: data });
   
  } catch (error) {
    dispatch({
      type: SEARCH_FOURNISSEUR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
