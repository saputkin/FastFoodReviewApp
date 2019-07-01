import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Input } from "semantic-ui-react";
import HomeActions from './actions';
import Alert from '../notifications';
import Profile from '../Profile'
import { withRouter } from "react-router-dom";

import ViewEditProfile from '../ViewEditProfile';
import AdvanceSearch from "../AdvanceSearch"

const placeholder = "Search User or Restaurant...";

class Home extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {
    this.props.loadNames();
  }

  render() {
    return (
      <div className='home-root'>
        <Form onSubmit={() => this.props.handleSubmit(this.props)}>
          <Form.Input
            list='results'
            label={placeholder}
            name="userOrRestaurantTofind"
            onChange={this.props.handleOnChange}
            control={Input}
            type="text"
            placeholder={placeholder}
          />
          <datalist id='results'>
            {this.props.results.map((name, idx) => {
              return (<option key={idx} value={name} />)
            })}
          </datalist>
          {/* <Form.Field>
                    <Link to="/edit/profile">
                    <Button label="Edit Profile"  className="p-button-raised p-button-rounded"/>
                  </Link>
                  </Form.Field>
                  <Form.Field>
                  <Link to="/advance/search">
                    <Button label="Advance Search" className="p-button-raised p-button-rounded"/>
                  </Link>
                  </Form.Field> */}
          <div>
            <Button label="Search" type="search" color="yellow" size="medium"></Button>
            {(this.props.searchError && <Alert>{this.props.searchError}</Alert>)}
            {(this.props.searchSuccess && <Profile>{this.props.searchSuccess}</Profile>)}
          </div>
        </Form>


      </div>
    );
  }

}


const mapStateToProps = (state) => {
  console.log("HomemapStateToProps=", state);
  return {
    userOrRestaurantTofind: state['home'].get('userOrRestaurantTofind'),
    searchError: state['home'].get('searchError'),
    searchSuccess: state['home'].get('searchSuccess'),
    results: state['home'].get('results')
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    handleOnChange: (e) => {
      console.log("handleOnCHange=", e);
      dispatch(HomeActions.updateValue(e.target.name, e.target.value))
    },
    handleSubmit: (state) => {
      console.log("Home handleSubmit=", state);
      dispatch(HomeActions.search(state))
    },
    loadNames: () => {
      dispatch(HomeActions.loadNames());
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
