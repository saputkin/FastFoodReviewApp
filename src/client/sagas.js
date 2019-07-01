import { all } from 'redux-saga/effects'
import AppSaga from './components/App/saga'
import {RegisterSaga, LoadUsersSaga} from './components/Register/saga'
import LoginSaga from './components/Login/saga'
import chainSagas from './components/Chains/saga';
import HomeSaga from './components/Home/saga';
import UpdateSaga from './components/ViewEditProfile/saga';
import AdvanceSearchSaga from './components/AdvanceSearch/saga'

export default function* Sagas() {
    yield all([
        AppSaga(),
        chainSagas.ChainsSaga(),
        RegisterSaga(),
        LoadUsersSaga(),
        LoginSaga(),
        HomeSaga(),
        UpdateSaga(),
        chainSagas.ChainReviewSaga(),
        chainSagas.DeleteReviewSaga(),
        chainSagas.EditReviewSaga(),
        AdvanceSearchSaga()
    ])
}
