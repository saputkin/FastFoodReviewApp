import HomeConstants from "./constants";


const HomeActions = {
    updateValue: (key, value) => {
        return {
            type: HomeConstants.UPDATE_VALUE,
            payload: [key, value]
        }
    },
    search: (props) => {
        return {
            type: HomeConstants.SEARCH,
            uri: '/api/load/userOrRestaurant',
            payload: props.userOrRestaurantTofind
        }
    },
    searchError: (e) => {
        return {
            type: HomeConstants.SEARCH_ERROR,
            payload: e
        }
    },
    searchSuccess: (res) => {
        return {
            type: HomeConstants.SEARCH_SUCCESS,
            payload: res
        }
    },
    loadNames: () => {
        return {
            type: HomeConstants.LOAD_NAMES,
            uri: '/api/load/names'
        }
    }
}

export default HomeActions;