import { List, Map} from 'immutable'
import initialState from '../../initialState'
import LoginConstants from "./constants";


  const loginReducer = (state = initialState.login, action) => {
    console.log("loginReducer::state=", state, "\naction =", action);
    switch (action.type) {
      case LoginConstants.LOGIN_USER:
        state = state.set('username', action.payload.username);
        state = state.set('password', action.payload.password);
        return state;
      case LoginConstants.LOGIN_USER_SUCCESS:
        state = state.set('cookie', action.payload.cookie);
        state = state.set('user', action.payload.user);
        state = state.set('location', action.payload.user.location)
        return state.set('loginSuccess', true);
      case LoginConstants.LOGIN_USER:
        return state;
      case LoginConstants.LOGIN_USER_ERROR:
        state = state.set('loginError', action.payload);
        console.log("login user error= ", state);
        return state;
      case LoginConstants.UPDATE_VALUE:
        console.log("update value=", action.payload);
        state = state.set('loginError', null);
        return state.set(action.payload[0], action.payload[1]);

      case LoginConstants.SIGN_OUT_USER:
        state = state.set('loginSuccess', false)
        state = state.set('user','')
        state = state.set('username', '')
        return state

      case LoginConstants.LOGIN_WITH_FB:
        console.log(action.payload)
          if(action.payload.userData.accessToken){
            state = state.set('loginSuccess',true)
            state = state.set('user',action.payload.userData.name)
            state = state.set('username',action.payload.userData.name)
          }

          return state
      default:
        console.log("default");
        return state;
    }
  };


  export default loginReducer;