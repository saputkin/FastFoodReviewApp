import React from 'react';
import { connect } from 'react-redux';
import RegisterActions from './actions';
import { Container, Segment, Grid } from "semantic-ui-react";
import SignUpForm from './SignUpForm';
import { Redirect } from 'react-router-dom';
import Alert from '../notifications'

// Regiser page component

class Register extends React.Component {

  constructor() {
    super()
    this.state = {
      image: null
    }
  }


  onDrop = (files) => {
    let reader = new FileReader()
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      // Make a fileInfo Object
      let fileInfo = {
        name: files[0].name,
        type: files[0].type,
        size: Math.round(files[0].size / 1000) + ' kB',
        base64: reader.result,
        file: files[0],
      };
      // Push it to the state
      this.setState({
        image: fileInfo
      })
    }
  }


  componentDidMount() {
    this.props.loadUsersEventHandler();
  }

  render() {
    if (this.props.registerSuccess) {
      console.log("routing to login...");
      return (
        <Redirect to='/login' />
      );
    }
    else
      return (
        <div className='register-root'>
          <Container>
            <Grid centered stackable>
              <Grid.Column width={6}>
                <Segment style={{ margin: "5em 0em", padding: "2em 1em" }}>
                  {(this.props.usernameError && <Alert>{this.props.usernameError}</Alert>)}
                  <SignUpForm
                    handleSubmit={() => this.props.RegisterUserEvenHandler({ state: this.props, image: this.state.image })}
                    handleOnChange={this.props.handleOnChange}
                    passwordError={this.props.passwordError}
                    onSuggestSelect={this.props.onSuggestSelect}
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
    users: state['register'].get('users'),
    username: state['register'].get('username'),
    password: state['register'].get('password'),
    usernameError: state['register'].get('usernameError'),
    passwordError: state['register'].get('passwordError'),
    registerSuccess: state['register'].get('registerSuccess'),
    location: state['register'].get('location')
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsersEventHandler: () => {
      dispatch(RegisterActions.loadUsers())
    },
    RegisterUserEvenHandler: (state) => {
      dispatch(RegisterActions.registerUser(state));
    },
    handleOnChange: (e) => {
      dispatch(RegisterActions.updateUsername(e.target.name, e.target.value));
    },
    onSuggestSelect: (location) => {
      dispatch(RegisterActions.updateLocation(location))
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);