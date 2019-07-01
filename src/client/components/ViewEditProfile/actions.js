import EditConstants from "./constants"

const EditActions = {
    updateValue: (newName) => {
        return {
            type: EditConstants.UPDATE_VALUE,
            payload: newName
        }
    },
    updateValueFailed: (e) => {
        return {
            type: EditConstants.UPDATE_VALUE_FAILED,
            payload: e
        }
    },
    updateValueSuccess: () => {
        return {
            type: EditConstants.UPDATE_VALUE_SUCCESS
        }
    },
    save: (props) => {
        let { user, userToSave, locationToSave } = props;
        return {
            type: EditConstants.SAVE,
            uri: '/api/user',
            payload: { user, userToSave, locationToSave }
        }
    },
    updateLocation: (location) => {
        return {
            type: EditConstants.UPDATE_LOCATION,
            payload: location
        }
    }
}

export default EditActions;