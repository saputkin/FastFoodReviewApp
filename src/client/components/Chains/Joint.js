import React,{Component,Fragment} from 'react'
import {connect} from 'react-redux';
import { Form, Input, TextArea, Button, Select,Rating, Icon, Dropdown} from 'semantic-ui-react'
import DropZone from '../Register/DropZone';
import MapContainer from './MapContainer'
import ChainsActions from './actions';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {List} from 'immutable'
import ReviewForm from './ReviewForm'
import {Link } from "react-router-dom";
import Review from './Review'
import moment from 'moment'
import { Lightbox } from 'react-modal-image';

export class Joint extends Component{
  
  constructor(props){
    super(props)
    const {params: {jointId}} = this.props.match;
    this.sortHandle = this.sortHandle.bind(this)
    this.handleSorting = this.handleSorting.bind(this)
    this.state = {
      sort: 'Oldest',
      chains:props.chains,
      jointId:jointId,
      bathroom:1,
      staff:1,
      clean:1,
      food:1,
      drive:0,
      delivery:0,
      photos:[]
    }
    
  }
  
  state = {
    jointId:"",
    bathroom:1,
    staff:1,
    clean:1,
    food:1,
    drive:0,
    delivery:0,
    photos:[],
    edit:false,
    editIndex:-1
  }
  onDrop = (files) => {
    let reader = new FileReader()
    for(var i = 0; i < files.length; i++){
      reader.readAsDataURL(files[i]);
      reader.onload = () =>{
        var photos = this.state.photos;
        photos.push(reader.result)
        this.setState({
          photos: photos
        })
      }
    }
  }
  createNotification = () =>{
      NotificationManager.warning('Please log In before trying to review!')
  }
  handleRate = (e, {rating,className}) =>{
    console.log(className," RATED ",rating)
    this.setState({
      [className]: rating
    })
  }
  //check if user can submit!

  getFormattedDate = (dateString) => {
    let date = new Date(dateString)
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
  
    return month + '/' + day + '/' + year;
}


  handleSubmit = (jointId) =>{
    if(this.props.username === ""){
      this.createNotification()
      return;
    }
    this.props.reviewChainEventHandler({
      username:this.props.username,
      jointId:jointId,
      review:this.state
    })
  }

  sortHandle = (e, { value }) =>{
    this.setState({
      sort:value
    })
  
  
  }

  componentWillReceiveProps(nextProps)
  { //when we add a review we want to make sure the component is updated with the new review
    console.log('componentWillReciveProps')
     if(this.props.chains !== nextProps.chains){
        const chain = nextProps.chains.find(item => item.name === this.state.jointId)
       this.setState({
         chains:nextProps.chains,
         reviews:chain.reviews
       })
       this.sortHandle(null,{value:this.state.sort})
     }
  }

  handleSorting = (reviews)=>{

    let out = new List(reviews)
    switch (this.state.sort) {
      case 'Oldest':
        // return out;
        break;
      case 'Newest':
        out = out.reverse()
        break;
      case 'Week':
        var last7DayStart = moment().startOf('day').subtract(1,'week');
        var yesterdayEndOfRange =  moment().endOf('day')
        out = out.filter(rev =>{
            return moment(new Date(rev.creationDate))
              .isBetween(last7DayStart, yesterdayEndOfRange)
        })
        break
      case 'Month':
        var last30DayStart = moment().startOf('day').subtract(1,'month');
        var yesterdayEndOfRange =  moment().endOf('day')
        out = out.filter(rev =>{
          return moment(new Date(rev.creationDate))
            .isBetween(last30DayStart, yesterdayEndOfRange)
      })
      case 'Year':
          var last356DayStart = moment().startOf('day').subtract(1,'year');
          var yesterdayEndOfRange =  moment().endOf('day')
          out = out.filter(rev =>{
            return moment(new Date(rev.creationDate))
              .isBetween(last356DayStart, yesterdayEndOfRange)
        })
      default:
        var sortBy = this.state.sort
        out = out.sort((a,b) => ( b[sortBy] - a[sortBy]))
        break;
    }
    return out.map((rev, idx) =>{
      return(
        <div key={idx}>
       <h3>{this.getFormattedDate(rev.creationDate)}
          <br/> Review by: {rev.reviewerName} {rev.reviewerName === this.props.username &&<div>
         <Link to="/review/edit" >
           <Button onClick={() =>this.props.updateToReview(rev)} ><Icon name='edit'/>Edit</Button>
        </Link>
          <Button onClick={()=>this.props.deleteReviewEventHandler(rev)}><Icon name='delete'/>Delete</Button></div>}</h3>
         <Review rev={rev}/>
       </div>)})

    
  }

  render(){
    const {params: {jointId}} = this.props.match;
    const rate_style = {width:"40%",margin:'auto'}
    //the chain we want to review/view reviews
    const chain = this.state.chains.find(item => item.name === this.state.jointId)
    //options of dropdown menu to sort the reviews
    const dropDownOptions = [{key:'Newest',text:'Newest',value:'Newest'},{key:'Oldest',text:'Oldest',value:'Oldest'}
                            ,{key:'Week',text:'Since Last Week',value:'Week'},{key:'Month',text:'Since Last Month',value:'Month'},
                            {key:'Year',text:'Since Last Year', value:'Year'},{key:'Bathroom', text:'Bathroom',value:'bathroom'},
                            {key:'Staff',text:'Staff Kindness',value:'staff'},{key:'Clean',text:'Cleanliness',value:'clean'},
                            {key:'Drive', text:'Drive-thru',value:'drive'},{key:'Delivery',text:'Delivery Speed',value:'delivery'},
                            {key:'Food',text:'Food Quality', value:'food'}]
    return (
      <>
       <h1 style={{fontFamily: 'Anton, sans-serif'}}>{jointId}</h1>
       <Link to={{
          pathname: `/chain/${chain.name}/googleMap`,
          state:{
            jointId:jointId,
            location: chain.location
          }}}>
       <h2>Location:{chain.location.description}</h2>
       </Link>
       <div>
         Add Review:
        <ReviewForm jointId={jointId} handleRate={this.handleRate} handleSubmit={this.handleSubmit} onDrop={this.onDrop} />
        <div style={rate_style}>
         <h2>Reviews:</h2>
         <span>
           Sort by{' '}
         <Dropdown
            inline
            selection
            options={dropDownOptions}
            defaultValue={'Oldest'}
            onChange={this.sortHandle}
            />
            </span> 
            {this.props.openLightBox && (
          <Lightbox
            medium={this.props.activeImage}
            large={this.props.activeImage}
            onClose={() => this.props.applyCloseLightBoxEventHandler(this.props.activeImage)}
          />)} 
          {//here we are sending the reviews to a switch function
           this.handleSorting(chain.reviews)
           }
        </div>
         </div>
         <NotificationContainer/>
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
      username: state['login'].get('username'),
      chains: state['chains'].get('chains'),
      tStamp: state['chains'].get('tStamp'),
      openLightBox: state['chains'].get('openLightBox'),
      activeImage: state['chains'].get('activeImage')
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    reviewChainEventHandler: (review) => {
      dispatch(ChainsActions.reviewChainAction(review))
    },
    deleteReviewEventHandler: (review) =>{
      dispatch(ChainsActions.deleteReviewAction(review))
    },
    updateToReview: (review) =>{
      dispatch(ChainsActions.updateToReview(review))
    },
    applyCloseLightBoxEventHandler: (img) =>{
      dispatch(ChainsActions. unsetActiveImage(img))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Joint)