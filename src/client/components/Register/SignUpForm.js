import React, { Fragment, useCallback } from "react";
import { Form, Button, Checkbox, Header, Icon, Input } from "semantic-ui-react";
import Alert from "../notifications/Alert";
import Geosuggest from 'react-geosuggest';
import DropZone from './DropZone'
import {GoogleApiWrapper } from 'google-maps-react'
import './Register.scss';


class SignUpForm extends React.Component{


render(){
  return (

    <Form onSubmit={this.props.handleSubmit}>
      <Header textAlign="center">Create your account.</Header>
      {this.props.passwordError || this.props.allError ? (
        <Alert message={this.props.passwordError || this.props.allError} type="negative" />
      ) : (
        ""
      )}
      {this.props.registerSuccess ? (
        <Alert message={this.props.registerSuccess} type="positive" />
      ) : (
        ""
      )}
      <Form.Field
        label="User Name"
        onChange={this.props.handleOnChange}
        name="username"
        control={Input}
        type="text"
        placeholder="User Name"
      />
      <Form.Field
        label="Password"
        onChange={this.props.handleOnChange}
        name="password"
        control={Input}
        type="password"
        placeholder="********"
      />
      Location      
      <Geosuggest 
      onSuggestSelect={this.props.onSuggestSelect}/>
      <DropZone onDrop ={this.props.onDrop}/>
      <Button type="submit" color="red" size="medium" fluid>
        {this.props.loadingloading ? (
          <Fragment>
            <Icon loading name="spinner" />
            Signing Up...
          </Fragment>
        ) : (
          "Sign up"
        )}
      </Button>
    </Form>
    
  );
}
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD3QiGKOJxZN_GL6Bp0hGMz-cXyLqKEkSk'
})(SignUpForm)