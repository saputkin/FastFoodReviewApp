import {RegisterActionsConstants} from './constants';


function loadUsersSuccess(users){
  return {
    type:RegisterActionsConstants.LOAD_USERS_SUCCESS,
    payload: {
      users
    }
  }
}

function registerUserError(e) {
  return {
    type: RegisterActionsConstants.REGISTER_USER_ERROR,
    payload: e
    
  }
}

function registerUser(props) {
  console.log('registerUser::props=', props);
  return {
    type: RegisterActionsConstants.REGISTER_USER,
    uri: 'api/register',
    payload: props
  }
}

function loadUsers() {
  return {
    type: RegisterActionsConstants.LOAD_USERS,
    uri: '/api/load/users'
  }
}

function loadUsersFailed(e) {
  return {
    type: RegisterActionsConstants.LOAD_USERS_FAILED,
    payload: e
  }
}

function loginUser(props) {
  return {
    type: RegisterActionsConstants.LOGIN_USER,
    payload: props
  }
}

function updateUsername(key, value) {
  return {
    type: RegisterActionsConstants.UPDATE_USERNAME,
    payload: [key, value]
  }
}

function registerUserSuccess() {
  return {
    type: RegisterActionsConstants.REGISTER_USER_SUCCESS
  }
}

function updateLocation(location) {
  return {
    type: RegisterActionsConstants.UPDATE_LOCATION,
    payload: location
  }
}

let RegisterActions = {
  updateLocation,
  registerUser,
  loginUser,
  loadUsers,
  updateUsername, 
  loadUsersSuccess,
  loadUsersFailed,
  registerUserError,
  registerUserSuccess}

export default RegisterActions