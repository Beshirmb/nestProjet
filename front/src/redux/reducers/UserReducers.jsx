import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_LOGOUT,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  CLEAR_TOAST,
  CLEAR_TOAST_CNX,
} from "../constants/UserConstant";

const initstateRegister = {
  message: "",
  loading: false,
};

const initstatePassword = {
  loading: false,
  changepass: "",
};

const initstateLogin = {
  userInfo: {success : false, message: ""},
 
  loading: false,
};

export const userLoginReducer = (state = initstateLogin, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state };

    case USER_LOGIN_SUCCESS:
      return { ...state, loading: true, userInfo: action.payload };

    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };
      case CLEAR_TOAST_CNX:
        return { ...state, loading: false, userInfo:null  };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userRegisterReducer = (state = initstateRegister, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };

    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, message: action.payload };

    case USER_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload, message: null  };
      case CLEAR_TOAST:
        return { ...state, loading: false, error: null, message: null  };

    case USER_REGISTER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const updatePassWordReducer = (state = initstatePassword, action) => {
  switch (action.type) {
    case UPDATE_PASSWORD_REQUEST:
      return { loading: true };

    case UPDATE_PASSWORD_SUCCESS:
      return { ...state, loading: false, changepass: action.payload };

    case UPDATE_PASSWORD_FAIL:
      return { ...state, loading: false, changepass: action.payload };

    default:
      return state;
  }
};
