import {ChainsActionsConstants} from './constants'
import {call, put, takeEvery} from 'redux-saga/effects'
import ChainsActions from './actions'


function* loadChains(action){
    console.log('ChainsSaga=', action)
    try{
        const res = yield call(fetch, action.uri,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(action.payload)
        })

        const json = yield call([res, 'json'])
        yield put(ChainsActions.loadChainsSuccessAction(json))
    }
    catch(e){
        yield put(ChainsActions.loadChainsFailureAction(e.message))
    }
}

function* reviewChain(action){
    console.log('ReviewChainSaga=')

    try{
        console.log('trying to post!')
        const res = yield call(fetch,action.uri,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(action.payload)
        })
        const json = yield call([res,'json'])
        yield put(ChainsActions.reviewSuccessAction(json))
    } catch(e){
        yield put(ChainsActions.reviewFailureAction(e.message))
    }

}
//TODO DELETE

function* deleteReview(action){
    console.log('DeleteReviewChainSaga=')

    try{
        const res = yield call(fetch,action.uri,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(action.payload)
        })
        
        const json = yield call([res,'json'])
        yield put(ChainsActions.reviewDeleteSuccessAction(json))
    } catch(e){
        yield put(ChainsActions.reviewDeleteFailureAction(e.message))
    }

}


function* editReview(action){
    console.log('DeleteReviewChainSaga=')

    try{
        const res = yield call(fetch,action.uri,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(action.payload)
        })
        
        const json = yield call([res,'json'])
        yield put(ChainsActions.editReviewSuccessAction(json))
    } catch(e){
        yield put(ChainsActions.editReviewFailureAction(e.message))
    }

}


//export this two sagAs
function* ChainReviewSaga(){
    yield takeEvery(ChainsActionsConstants.REVIEW_CHAIN_ACTION, reviewChain)
}

function* DeleteReviewSaga(){
    yield takeEvery(ChainsActionsConstants.DELETE_REVIEW_ACTION, deleteReview)
}

function* ChainsSaga(){
    yield takeEvery(ChainsActionsConstants.LOAD_CHAINS_ACTION,loadChains)
}

function* EditReviewSaga(){
    yield takeEvery(ChainsActionsConstants.EDIT_REVIEW_ACTION, editReview)
}
const chainSagas ={
    ChainsSaga,
    ChainReviewSaga,
    DeleteReviewSaga,
    EditReviewSaga
}
export default chainSagas