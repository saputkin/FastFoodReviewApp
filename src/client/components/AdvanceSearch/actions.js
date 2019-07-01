import AdvanceSearchConstants from "./constants";

const AdvanceSearchActions = {
    updateValue: (name, value) => {
        return {
            type: AdvanceSearchConstants.UPDATE_VALUE,
            payload: [name, value]
        }
    },
    search: (props) => {
        console.log("search=", props);
        let toSearch = {};
        switch (props.searchBy) {
            case "searchByLocation":
                toSearch['location'] = props.location;
                break;
            case "searchByName":
                toSearch['name'] = props.name;
                break;
            case "closerBetter":
                toSearch['closerBetter'] = { param: props.closerBetter, location: props.userLocation };
                break;
            default:
                toSearch['location'] = props.location;
                toSearch['name'] = props.name;
        }
        toSearch['average'] = props.average;
        return {
            type: AdvanceSearchConstants.SEARCH,
            uri: '/api/find/restaurant',
            payload: toSearch
        }
    },
    updateLocation: (location) => {
        return {
            type: AdvanceSearchConstants.ON_SUGGEST_SELECT,
            payload: location
        }
    },
    searchError: (e) => {
        return {
            type: AdvanceSearchConstants.SEARCH_ERROR,
            payload: e
        }
    },
    searchSuccess: (res) => {
        return {
            type: AdvanceSearchConstants.SEARCH_SUCCESS,
            payload: res
        }
    }
}

export default AdvanceSearchActions;