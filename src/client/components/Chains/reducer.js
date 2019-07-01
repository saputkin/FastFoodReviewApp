import {ChainsActionsConstants} from './constants'
import initialState from '../../initialState'
import {List} from 'immutable'



const ChainsReducer = (state = initialState.chains, action) => {
    console.log('ChainsReducerState=', state)
    switch(action.type){
        

        case ChainsActionsConstants.LOAD_CHAINS_ACTION_SUCCESS:
            console.log('RECEIVED:',ChainsActionsConstants.LOAD_CHAINS_ACTION_SUCCESS)
            state = state.set('chains', new List(action.payload.chains))
            return state
        
        case ChainsActionsConstants.LOAD_CHAINS_ACTION_FAILURE:
            console.log('RECEIVED:',ChainsActionsConstants.LOAD_CHAINS_ACTION_FAILURE)
            return state
        //add the new review to the list
        case ChainsActionsConstants.REVIEW_ACTION_SUCCESS:
            console.log('REVIEW_ACTION_SUCCESS=',action.payload)
            state = state.update('chains', chains =>{
                return new List(chains).map(ch =>{
                    if(ch.name === action.payload.json.restaurantName){
                        ch.reviews = new List(ch.reviews).push(action.payload.json)
                    return ch}
                return ch
                })
            })
            //to rerender the component
            state = state.update('tStamp', tstamp => ++tstamp)
            // state = state.update('tStamp',tStamp => ++tStamp);
            return state
        
        case ChainsActionsConstants.REVIEW_ACTION_FAILURE:
            console.log('REVIEW_ACTION_FALIURE')
            return state
        
        case ChainsActionsConstants.DELETE_ACTION_SUCCESS:
            console.log('DELETE_ACTION_SUCCESS')
            state = state.update('chains', chains =>{
                return new List(chains).map(ch =>{
                    if(ch.name === action.payload.json.restaurantName)
                        ch.reviews = new List(ch.reviews).filter(rev => (rev.creationDate != action.payload.json.creationDate))
                    return ch;

                })
            })
            state = state.update('tStamp', tstamp => ++tstamp)
            return state
        case ChainsActionsConstants.DELET_ACTION_FAILURE:
                console.log('DELETE_ACTION_FAILURE')
            return state
        
        case ChainsActionsConstants.UPADTE_TO_REVIEW:
            console.log('updateToReview =',action.review.restaurantName)
            state = state.set('toEdit',action.review)
            return state
        case ChainsActionsConstants.EDIT_REVIEW_ACTION_SUCCESS:
            state = state.update('chains', chains =>{
                return chains.map(ch => {
                    if(ch.name === action.chain.name)
                        return action.chain
                    return ch
                })
            })
            state = state.update('tStamp', tstamp => ++tstamp)
            return state

        case ChainsActionsConstants.SET_ACTIVE_IMAGE:
            state = state.set('activeImage',action.img)
            state = state.set('openLightBox', true)
            return state
        
        case ChainsActionsConstants.UNSET_ACTIVE_IMAGE:
            state = state.set('openLightBox', false)
            state = state.set('activeImage',null)
            return state

        default:
            return state

    }
}


export default ChainsReducer