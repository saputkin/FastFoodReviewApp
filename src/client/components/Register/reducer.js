import { List, Map} from 'immutable'
import initialState from '../../initialState'
import {RegisterActionsConstants} from "./constants";

 
function isUsernameError(name, users) {
  console.log("users=", users, "name=", name);
  var exists = users && users
    .map((user) => name === user.username)
    .reduce((acc, curr) => acc || curr, false);
    console.log("isUserExist=", name, exists);
  return exists && 'this username already exist!!';
}

  const authReducer = (state = initialState.register, action) => {
    console.log("authReducer::state=", state, "\naction =", action);
    switch (action.type) {
      case RegisterActionsConstants.REGISTER_USER:
        state = state.set('username', action.payload.username);
        state = state.set('password', action.payload.password);
        return state;
      case RegisterActionsConstants.REGISTER_USER_ERROR:
        state = state.set('usernameError', "This username already exist!");
        return state;
      case RegisterActionsConstants.UPDATE_USERNAME:
        console.log("UPDATE_USERNAME:",action.payload)
        state =  state.set(action.payload[0], action.payload[1]);
        if (action.payload[0] === 'username') {
          state = state.set('usernameError', null);
          state = state.set("usernameError", isUsernameError(action.payload[1], state.get("users")));
        }
        return state;
      case RegisterActionsConstants.REGISTER_USER_SUCCESS:
        return state.set('registerSuccess', true);
      case RegisterActionsConstants.LOGIN_USER:
        return state;
      case RegisterActionsConstants.LOGIN_USER_ERROR:
        return state;
      case RegisterActionsConstants.LOAD_USERS_SUCCESS:
        console.log(action.payload.users)
        let res = action.payload.users.map(elm => elm);
        state = state.set('users', new List(res));
        console.log("load users success=", state, "\nres=", res);
        return state;
      case RegisterActionsConstants.LOAD_USERS_FAILED:
        state = state.set('allError', 'Load users failed!' + action.payload);
        return state;
      case RegisterActionsConstants.UPDATE_LOCATION:
        console.log('update location', action.payload)
        state = state.set('location', action.payload);
        return state;
      default:
        console.log("default");
      
        return state;
    }
  };


  export default authReducer;