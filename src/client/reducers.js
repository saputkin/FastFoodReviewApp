import { combineReducers } from 'redux';
import AppReducer from './components/App/reducer';
import authReducer from './components/Register/reducer';
import loginReducer from './components/Login/reducer';
import chainsReducer from './components/Chains/reducer'
import HomeReducer from './components/Home/reducer';
import EditReducer from './components/ViewEditProfile/reducer';
import AdvanceSearchReducer from "./components/AdvanceSearch/reducer"


export default combineReducers({
  app: AppReducer,
  register: authReducer,
  login: loginReducer,
  chains: chainsReducer,
  home: HomeReducer,
  edit: EditReducer,
  advanceSearch: AdvanceSearchReducer
});

