import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";


import {
  userLoginReducer,
  userRegisterReducer,
  updatePassWordReducer,
} from "./reducers/UserReducers";
import { composeWithDevTools } from "redux-devtools-extension";


import {
  GetUserProfileReducers,
  UpdatePasswordUserReducers,
  UpdatePhotoUserReducers,
} from "./reducers/UserProfileReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  updatepassword: updatePassWordReducer,
  updatepassword: updatePassWordReducer,
  GetUserProfileReducers: GetUserProfileReducers,
  UpdatePasswordUserReducers: UpdatePasswordUserReducers,
  UpdatePhotoUserReducers: UpdatePhotoUserReducers,
});

const initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
