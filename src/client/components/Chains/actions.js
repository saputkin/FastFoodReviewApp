import { ChainsActionsConstants } from './constants';



function loadChainsAction(tag) {
    return {
      type: ChainsActionsConstants.LOAD_CHAINS_ACTION,
      uri: '/api/load/chains',
      payload: {
        tag
      }
    }
  }
  
  function loadChainsSuccessAction(chains){
    return {
      type: ChainsActionsConstants.LOAD_CHAINS_ACTION_SUCCESS,
      payload: {
        chains
      }
    }
  }
  
  function loadChainsFailureAction(message){
    return {
      type: ChainsActionsConstants.LOAD_CHAINS_ACTION_FAILURE,
      payload:{message
      }
    }
  }

  function reviewChainAction(review){
    return {
        type: ChainsActionsConstants.REVIEW_CHAIN_ACTION,
        uri:'/api/reviews/create',
        payload: {
            review
        }
    }
}

function deleteReviewAction(review){
    return{
        type: ChainsActionsConstants.DELETE_REVIEW_ACTION,
        uri:'/api/reviews/delete',
        payload:{
            review
        }
    }
}

function reviewSuccessAction(json){
    return{
        type: ChainsActionsConstants.REVIEW_ACTION_SUCCESS,
        payload:{
          json
        }
    }
}

function reviewFailureAction(error){
    return{
        type: ChainsActionsConstants.REVIEW_ACTION_FAILURE
    }
}

function reviewDeleteSuccessAction(json){
    return {
        type: ChainsActionsConstants.DELETE_ACTION_SUCCESS,
        payload:{
          json
        }
    }
}

function reviewDeleteFailureAction(){
    return{
        type: ChainsActionsConstants.DELET_ACTION_FAILURE,
        payload:{
            message
        }
    }
}

function editReviewSuccessAction(chain){
  return{
    type: ChainsActionsConstants.EDIT_REVIEW_ACTION_SUCCESS,
      chain
  }
}
function editReviewFailureAction(message){
  return{
    type: ChainsActionsConstants.EDIT_REVIEW_ACTION_FAILURE,
    payload:{
      message
    }
  }

}

function updateToReview(review){
  return{
    type: ChainsActionsConstants.UPADTE_TO_REVIEW,
    review
  }
}

function editReviewAction(review){
  return{
    type: ChainsActionsConstants.EDIT_REVIEW_ACTION,
    uri:'/api/reviews/edit',
    payload:{
      review
    }
  }
}

function  setActiveImage(img) {
  return {
    type: ChainsActionsConstants.SET_ACTIVE_IMAGE,
    img: img
  }
}

function unsetActiveImage(img){
  return {
    type: ChainsActionsConstants.UNSET_ACTIVE_IMAGE,
    img : img
  }
}

  let ChainsActions = {
      loadChainsAction,
      loadChainsFailureAction,
      loadChainsSuccessAction,
      reviewChainAction,
      deleteReviewAction,
      reviewSuccessAction,
      reviewFailureAction,
      reviewDeleteSuccessAction,
      reviewDeleteFailureAction,
      updateToReview,
      editReviewAction,
      editReviewSuccessAction,
      editReviewFailureAction,
      setActiveImage,
      unsetActiveImage
  }

  export default ChainsActions