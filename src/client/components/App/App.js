import React,{Component, Fragment} from 'react';
import {Router, Route, Link } from "react-router-dom";
import './App.scss';
import Register from '../Register';
import Login from '../Login';
import LoginActions from '../Login/actions'
import { connect } from 'react-redux';
import AppActions from './actions';
import ChainsActions from '../Chains/actions'
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import Chains from '../Chains'
import Joint from '../Chains/Joint'
import Home from '../Home';
import EditReview from '../Chains/EditReview'
import MapContainer from '../Chains/MapContainer'
import ViewEditProfile from '../ViewEditProfile';
import AdvanceSearch from "../AdvanceSearch"
import { Menu } from "semantic-ui-react";
import history from "../history"
import RootWelcome from "./RootWelcome"

class App extends React.Component {
    componentDidMount() {
        this.props.loadChainsEventHandler('');
    }

signOutHandle = () =>{
  this.props.signOutEventHandler()
  history.push('/signout')
}

  render() {
        console.log('tags=', this.props.tags);
    return (
      <>
      <Router history={history}>
        <Menu inverted>
        {this.props.logged&&
        // <Link to="/home">
          <Menu.Item name='Home' onClick={() => history.push('/home')}/>
        // </Link>
        }
        {/* <Link to="/register"> */}
          <Menu.Item name='Register' onClick={()=> history.push('/register')}/>
        {/* </Link> */}
        { !this.props.logged?
        (<Link to="/login">
          <Menu.Item name='Login'/>
        </Link>):
        (<>
        {/* <Link to="/edit/profile"> */}
        <Menu.Item name="Edit Profile" onClick={() => history.push('/edit/profile')}/>
        {/* </Link>
        <Link to="/advance/search"> */}
        <Menu.Item name="Advanced Search" onClick={() => history.push('/advance/search')}/>
        {/* </Link><Link to="/signout"> */}
        <Menu.Item name='Signout' onClick={this.signOutHandle}/>
        {/* </Link> */}
        </>)}
        </Menu>
        <div className="app-root">
          <Route exact path="/" component={RootWelcome} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component = {Login} />
          <Route exact path="/chain/:jointId" component = {Joint} />
          <Route exact path="/chain/:jointId/googleMap" component ={MapContainer} />
          <Route exact path='/home' component = {Home} />
          <Route exact path='/review/edit'component ={EditReview}/>
          <Route exact path="/edit/profile" component={ViewEditProfile} />
          <Route exact path="/advance/search" component={AdvanceSearch} />
         </div>
      </Router>
      </>
    );
  }
}


const mapStateToProps = (state) => {
  return {
      tag: state['app'].get('tag'),
      tags: state['app'].get('tags').toArray(),
      logged: state['login'].get('loginSuccess')
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadChainsEventHandler: (tag) => {
      dispatch(ChainsActions.loadChainsAction(tag))
    },
    signOutEventHandler: () =>{
      dispatch(LoginActions.signOutUser())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
