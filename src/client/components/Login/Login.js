import React from 'react';
import { connect } from 'react-redux';
import LoginActions from './actions';
import { Container, Segment, Grid } from "semantic-ui-react";
import LoginForm from './LoginForm';
import { Redirect, withRouter } from 'react-router-dom';
import Alert from '../notifications'
import FacebookLogin from 'react-facebook-login';
import history from '../history'

class Login extends React.Component {

  constructor() {
    super()
  }

  responseFacebook = (response) => {
    console.log(response);
    this.props.handleLoginFB(response)
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.loginSuccess)
        history.push('/home')
    }
  }

  render() {
    return (
      <div className='login-root'>
        <FacebookLogin
          appId="2227549107293710"
          fields="name,email,picture"
          callback={this.responseFacebook} />
        <Container>
          <Grid centered stackable>
            <Grid.Column width={6}>
              <Segment style={{ margin: "5em 0em", padding: "2em 1em" }}>
                {(this.props.loginError && <Alert>{this.props.loginError}</Alert>)}
                <LoginForm
                  handleSubmit={() => this.props.LoginUserEvenHandler(this.props)}
                  handleOnChange={this.props.handleOnChange}
                  passwordError={this.props.passwordError}
                  onSuggestSelect={this.onSuggestSelect}
                  onDrop={this.onDrop}
                />
              </Segment>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}


const mapStateToProps = (state, props) => {
  console.log("mapStateToProps=", state);
  return {
    username: state['login'].get('username'),
    password: state['login'].get('password'),
    loginError: state['login'].get('loginError'),
    loginSuccess: state['login'].get('loginSuccess'),
    user: state['login'].get('user'),
    location: state['login'].get('location'),
    cookie: state['login'].get('cookie')
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    LoginUserEvenHandler: (state) => {
      console.log("loginUserEventHandler =", state);
      dispatch(LoginActions.loginUser(state));
    },
    handleOnChange: (e) => {
      console.log("handleOnCHange=", e);
      dispatch(LoginActions.updateValue(e.target.name, e.target.value))
    },
    handleLoginFB: (userData) => {
      dispatch(LoginActions.loginWithFB(userData))
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))