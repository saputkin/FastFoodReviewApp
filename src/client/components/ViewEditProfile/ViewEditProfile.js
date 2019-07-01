import React, { Fragment } from "react";
import { Form, Button, Checkbox, Header, Icon, Input } from "semantic-ui-react";
import Geosuggest from 'react-geosuggest';
import RegisterActions from '../Register/actions';
import EditActions from './actions';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import { GoogleApiWrapper } from 'google-maps-react';
import { Redirect } from 'react-router-dom';

class ViewEditProfile extends React.Component {
  constructor() {
    console.log("in View profile");
    super();
  }

  componentDidMount() {
    this.props.loadUsersEventHandler();
  }

  createNotification = (message) => {
    console.log("create notication")
    NotificationManager.success(message);
  }

  render() {

    return (
      <div>
        <Form onSubmit={() => this.props.handleSubmit(this.props)}>
          <Header textAlign="center">Edit your Profile</Header>
          <Form.Field
            label="User Name"
            onChange={this.props.handleOnCHange}
            name="username"
            control={Input}
            type="text"
            placeholder={this.props.user.username}
          />
          {console.log(this.props.isExist)}
          {this.props.isExist && <p>This username already exist!</p>}
          <Geosuggest
            placeholder={this.props.user.location ? this.props.user.location.description : "unknown place"}
            onSuggestSelect={this.props.onSuggestSelect} />
          <Button type="save" color="red" size="medium" fluid>Save</Button>
          {this.props.updateSuccess && NotificationManager.success("your changes successfuly saved!")}
          {this.props.updateError && NotificationManager.error("somthimg went wrong, please try again.")}
          {this.props.updateSuccess && <Redirect to="/home" />}
        </Form>
        <NotificationContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("editmapStateToProps=", state);
  return {
    user: state['login'].get("user"),
    userToSave: state['edit'].get('userToSave'),
    users: state['edit'].get('users'),
    isExist: state['edit'].get('isExist'),
    locationToSave: state['edit'].get('locationToSave'),
    updateSuccess: state['edit'].get('updateSuccess'),
    updateError: state['edit'].get('updateError')
  }
};

const mapDispatchToProps = (dispatch) => {
  // return {
  //     handleOnChange: (e) => {
  //       console.log("handleOnCHange=", e.target.value);
  //       dispatch(EditActions.updateValue(e.target.value))
  //   },
  return {
    handleOnCHange: (e) => {
      dispatch(EditActions.updateValue(e.target.value))
    },
    handleSubmit: (state) => {
      console.log("edit handleSubmit=", state);
      dispatch(EditActions.save(state))
    },
    loadUsersEventHandler: () => {
      dispatch(RegisterActions.loadUsers())
    },
    onSuggestSelect: (location) => {
      console.log(location);
      dispatch(EditActions.updateLocation(location));
    }
  }
};

let wrapper = GoogleApiWrapper({
  apiKey: 'AIzaSyD3QiGKOJxZN_GL6Bp0hGMz-cXyLqKEkSk'
})(ViewEditProfile);
export default connect(mapStateToProps, mapDispatchToProps)(wrapper)


