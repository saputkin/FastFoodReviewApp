import { call, put, takeEvery } from 'redux-saga/effects';
import EditConstants from './constants';
import EditActions from './actions';

function* UpdateUserSaga(action) {
    console.log("EditSaga=", action);
    try {
        const res = yield call(fetch, action.uri, {
            method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(action.payload)
        });
        yield put(EditActions.updateValueSuccess());
    }
    catch (e) {
        yield put(EditActions.updateValueFailed(e));
    }
}

function* UpdateSaga() {
    yield takeEvery(EditConstants.SAVE, UpdateUserSaga);
}

export default UpdateSaga;