
import { call, put, takeEvery } from 'redux-saga/effects';
import HomeActions from './actions';
import HomeConstants from './constants';


function* HomeAction(action) {
    console.log("HomeSaga action=", action);
    try {
        const res = yield call(fetch, action.uri,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({userOrRestaurantTofind: action.payload})
            });
      
        const json = yield call([res, 'json']); 
        console.log("HomeSaga json =", json);
        if (!json)
            yield put(HomeActions.searchError("there is no such user or restaurant!"));
        else
            yield put(HomeActions.searchSuccess(json));
    } catch(e) {
        yield put(HomeActions.searchError(e.message));
    }
}

function* HomeSaga() {
    yield takeEvery([HomeConstants.SEARCH, HomeConstants.LOAD_NAMES], HomeAction);
}

export default HomeSaga ;
