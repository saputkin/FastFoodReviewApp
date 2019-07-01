
import { call, put, takeEvery } from 'redux-saga/effects';
import LoginActions from './actions';
import LoginConstants from './constants';


function* LoginUserAction(action) {
    console.log("LoginSaga action=", action);
    try {
        const res = yield call(fetch, action.uri,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(action.payload)
            });
      
        const json = yield call([res, 'json']); 
        console.log("LoginSaga json =", json);
        if (!json.cookie || !json.user)
            yield put(LoginActions.loginUserError("user or password incorrect!"));
        else
            yield put(LoginActions.loginUserSuccess(json));
    } catch(e) {
        yield put(LoginActions.loginUserError(e.message));
    }
}

function* LoginSaga() {
    yield takeEvery(LoginConstants.LOGIN_USER, LoginUserAction);
}

export default LoginSaga ;
