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
} from "../constants/FournisseurConstant";

const Get_Fournisseur = {
  message: "",
  loading: false,
};

const Add_Fournisseur = {
  message: "",
  loading: false,
};

const Update_Fournisseur = {
  message: "",
  loading: false,
};

const Delete_Fournisseur = {
  message: "",
  loading: false,
};

const Search_Fournisseur = {
  message: "",
  loading: false,
};

export const Get_Fournisseur_Reducers = (state = Get_Fournisseur, action) => {
  switch (action.type) {
    case GET_FOURNISSEUR_REQUEST:
      return { ...state, loading: true };

    case GET_FOURNISSEUR_SUCCESS:
      return { ...state, loading: false, message: action.payload };

    case GET_FOURNISSEUR_FAIL:
      return { ...state, loading: false, message: action.payload };

    default:
      return state;
  }
};

export const Add_Fournisseur_Reducers = (state = Add_Fournisseur, action) => {
  switch (action.type) {
    case ADD_FOURNISSEUR_REQUEST:
      return { ...state, loading: true };

    case ADD_FOURNISSEUR_SUCCESS:
      return { ...state, loading: false, message: action.payload };

    case ADD_FOURNISSEUR_FAIL:
      return { ...state, loading: false, message: action.payload };

    default:
      return state;
  }
};

export const Update_Fournisseur_Reducers = (state = Update_Fournisseur, action) => {
  switch (action.type) {
    case UPDATE_FOURNISSEUR_REQUEST:
      return { ...state, loading: true };

    case UPDATE_FOURNISSEUR_SUCCESS:
      return { ...state, loading: false, message: action.payload };

    case UPDATE_FOURNISSEUR_FAIL:
      return { ...state, loading: false, message: action.payload };

    default:
      return state;
  }
};

export const Delete_Fournisseur_Reducers = (state = Delete_Fournisseur, action) => {
  switch (action.type) {
    case DELETE_FOURNISSEUR_REQUEST:
      return { ...state, loading: true };

    case DELETE_FOURNISSEUR_SUCCESS:
      return { ...state, loading: false, message: action.payload };

    case DELETE_FOURNISSEUR_FAIL:
      return { ...state, loading: false, message: action.payload };

    default:
      return state;
  }
};

export const Search_Fournisseur_Reducers = (state = Search_Fournisseur, action) => {
  switch (action.type) {
    case SEARCH_FOURNISSEUR_REQUEST:
      return { ...state, loading: true };

    case SEARCH_FOURNISSEUR_SUCCESS:
      return { ...state, loading: false, message: action.payload };

    case SEARCH_FOURNISSEUR_FAIL:
      return { ...state, loading: false, message: action.payload };

    default:
      return state;
  }
};
