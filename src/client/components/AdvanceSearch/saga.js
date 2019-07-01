import { call, put, takeEvery } from 'redux-saga/effects';
import AdvanceSearchConstants from "./constants";
import AdvanceSearchActions from "./actions";

function* advanceSearchAction(action) {
    console.log("advanceSearchAction=", action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.payload)
            })
        const json = yield call([res, 'json']); 
        console.log("HomeSaga json =", json);
        if (!json) 
            yield put(AdvanceSearchActions.searchError("no such restaurant!"));
        else
            yield put(AdvanceSearchActions.searchSuccess(json));
        }
    catch(e) {
        yield put(AdvanceSearchActions.searchError(e));
    }
}

function* AdvanceSearchSaga() {
    yield takeEvery(AdvanceSearchConstants.SEARCH, advanceSearchAction);
}

export default AdvanceSearchSaga;