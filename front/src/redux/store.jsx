import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  Add_Fournisseur_Reducers,
  Delete_Fournisseur_Reducers,
  Get_Fournisseur_Reducers,
  Search_Fournisseur_Reducers,
  Update_Fournisseur_Reducers,
} from "./reducers/FournisseurReducers";
import { GetOrganisationReducers } from "./reducers/OraganisationReducers";

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
  Get_Fournisseur_Reducers: Get_Fournisseur_Reducers,
  Add_Fournisseur_Reducers: Add_Fournisseur_Reducers,
  Update_Fournisseur_Reducers: Update_Fournisseur_Reducers,
  Delete_Fournisseur_Reducers: Delete_Fournisseur_Reducers,
  Search_Fournisseur_Reducers: Search_Fournisseur_Reducers,
  updatepassword: updatePassWordReducer,
  GetOrganisationReducers: GetOrganisationReducers,
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
