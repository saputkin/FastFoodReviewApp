import LoginConstants from './constants';

let LoginActions = {
    loginUser: (props) => {
        return {
            type: LoginConstants.LOGIN_USER,
            uri: `/api/login/user`,
            payload: props
        };
    },
    loginUserSuccess: (user) => {
        return {
            type: LoginConstants.LOGIN_USER_SUCCESS,
            payload: user
        };
    },
    loginUserError: (e) => {
        return {
            type: LoginConstants.LOGIN_USER_ERROR,
            payload: e
        };
    },
    updateValue: (key, value) => {
        return {
            type: LoginConstants.UPDATE_VALUE,
            payload: [key, value]
        };
    },
    signOutUser: () =>{
        return{
            type: LoginConstants.SIGN_OUT_USER
        }
    },

    loginWithFB: (userData) =>{
        return{
            type: LoginConstants.LOGIN_WITH_FB,
            payload:{
                userData
            }
        }
    }
};
export default LoginActions;