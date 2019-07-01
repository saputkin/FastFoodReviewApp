import initialState from '../../initialState';
import EditConstants from './constants';
import {RegisterActionsConstants}  from '../Register/constants';
import { List, Map } from 'immutable';

const isUsernameExist = (name, users) => {
    console.log(users);
    var exists = users && users
        .map((user) => name === user.username)
        .reduce((acc, curr) => acc || curr, false);
        console.log("isUserExist=", name, exists);
    return exists
}

const EditReducer = (state = initialState.edit, action) => {
    console.log("EditReducer=", action, state);
    switch(action.type) {
        case EditConstants.UPDATE_VALUE:
            state = state.set("userToSave", action.payload);
            state = state.set("isExist", isUsernameExist(action.payload, state.get("users")));
            state.set("updateError", null);
            state.set('updateSuccess', null);
            return state;
        case EditConstants.UPDATE_VALUE_SUCCESS:
            state = state.set('updateSuccess', true);
            return state;
        case EditConstants.UPDATE_VALUE_FAILED:
            return state.set("updateError". action.payload);
        case RegisterActionsConstants.LOAD_USERS_SUCCESS:
                let res = action.payload.users.map(elm => elm);
                state = state.set('users', new List(res));
                return state;
        case EditConstants.UPDATE_LOCATION:
            console.log("updatelocation ", action);
            return state.set('locationToSave',  Map({
                description: action.payload ? action.payload.description : "",
                location: action.payload ? action.payload.location : {}
              }));
        default:
            return state;
    }
}

export default EditReducer;