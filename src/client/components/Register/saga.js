export default RegisterSaga
import { call, put, takeEvery } from 'redux-saga/effects';
import RegisterActions from './actions';
import { RegisterActionsConstants } from './constants';


function* RegisteUsersaction(action) {
    console.log("RegisterSaga action=", action);
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
        yield put(RegisterActions.registerUserSuccess());
    } catch(e) {
        yield put(RegisterActions.registerUserError(e.message));
    }
}

function* RegisterSaga() {
    yield takeEvery(RegisterActionsConstants.REGISTER_USER, RegisteUsersaction);
}


function* loadUsersAction(action) {
    console.log("loadUsersAction =", action);
    try {
        const res = yield call(fetch, action.uri,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              },
            });
      
        const json = yield call([res, 'json']);
        yield put(RegisterActions.loadUsersSuccess(json));
    } catch(e) {
        yield put(RegisterActions.loadUsersFailed(e.message));
    }
}

function* LoadUsersSaga() {
    yield takeEvery(RegisterActionsConstants.LOAD_USERS, loadUsersAction);
}


export {
    RegisterSaga,
    LoadUsersSaga
};
