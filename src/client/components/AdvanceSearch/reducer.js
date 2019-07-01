import initialState from '../../initialState';
import AdvanceSearchConstants from './constants';
import { Map, List } from 'immutable';


const AdvanceSearchReducer = (state = initialState.advanceSearch, action) => {
    console.log("AdvanceSearchReducer=", action);
    switch(action.type) {
        case AdvanceSearchConstants.UPDATE_VALUE:
            state = state.set(action.payload[0], action.payload[1]);
            state = state.set('searchError', null);
            state = state.set('searchSuccess', null);
            return state;
        case AdvanceSearchConstants.SEARCH_SUCCESS:
            state = state.set('searchSuccess', action.payload)
            let min = state.get('average');
            state = state.update("searchSuccess", (chains) => {   
                return new List(chains).filter(ch =>{
                    console.log("average=", Number(ch.average))
                    return Number(ch.average) >= min;
                })
            });
            let res = state.get('searchSuccess');
            if (res.size <= 0) {
                state = state.set('searchError', "no such restaurant!!")
                console.log("here")
            }
            return state;
        case AdvanceSearchConstants.ON_SUGGEST_SELECT:
            console.log("updatelocation ", action);
            return state.set('location',  Map({
                description: action.payload ? action.payload.description : "",
                location: action.payload ? action.payload.location : {}
            }));
        default:
            return state;
    }
}

export default AdvanceSearchReducer;