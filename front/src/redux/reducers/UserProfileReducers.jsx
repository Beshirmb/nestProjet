import * as ConstantUser from "../constants/UserProfileConstant";

const GetUser = {
  message: "",
  error: "",
};

export const GetUserProfileReducers = (state = GetUser, action) => {
  switch (action.type) {
    case ConstantUser.GET_USER_PROFILE_REQUEST:
      return { ...state };

    case ConstantUser.GET_USER_PROFILE_SUCCESS:
      return { ...state, message: action.payload };

    case ConstantUser.GET_USER_PROFILE_FAIL:
      return { ...state, error: action.payload };

    case ConstantUser.UPDATE_USER_PROFILE_REQUEST:
      return { ...state };

    case ConstantUser.UPDATE_USER_PROFILE_SUCCESS:
      return { ...state, message: action.payload };

    case ConstantUser.UPDATE_USER_PROFILE_FAIL:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export const UpdatePasswordUserReducers = (state = GetUser, action) => {
  switch (action.type) {
    case ConstantUser.UPDATE_PASSWORD_USER_REQUEST:
      return { message: action.payload };

    case ConstantUser.UPDATE_PASSWORD_USER_SUCCESS:
      return { ...state, message: action.payload };

    case ConstantUser.UPDATE_PASSWORD_USER_FAIL:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export const UpdatePhotoUserReducers = (state = GetUser, action) => {
  switch (action.type) {
    case ConstantUser.UPDATE_PHOTO_USER_REQUEST:
      return { message: action.payload };

    case ConstantUser.UPDATE_PHOTO_USER_SUCCESS:
      return { ...state, message: action.payload };

    case ConstantUser.UPDATE_PHOTO_USER_FAIL:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
