import initialState from "../../initialState";
import HomeConstants from "./constants";

const HomeReducer = (state = initialState.home, action) => {
    switch (action.type) {
        case HomeConstants.UPDATE_VALUE:
            state = state.set(action.payload[0], action.payload[1]);
            state = state.set('searchError', null);
            state = state.set('searchSuccess', null);
            return state;
        case HomeConstants.SEARCH_ERROR:
            return state.set('searchError', action.payload);
        case HomeConstants.SEARCH_SUCCESS:
            if (action.payload.names)
                return state.set('results', action.payload.names)
            return state.set('searchSuccess', action.payload);
        default:
            return state;
    }
}

export default HomeReducer;