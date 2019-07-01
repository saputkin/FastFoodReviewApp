import React from "react";
import { Form, Button, Card, Grid } from 'semantic-ui-react'
import AdvanceSearchActions from "./actions";
import { connect } from 'react-redux';
import Profile from "../Profile";
import Geosuggest from 'react-geosuggest';
import { GoogleApiWrapper } from 'google-maps-react';
import Alert from '../notifications';



class AdvanceSearch extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Form onSubmit={() => this.props.onSearch(this.props)}>
                    <Form.Group inline>
                        <label>Search By</label>
                        <Form.Radio
                            label='Location'
                            name='searchBy'
                            value='searchByLocation'
                            checked={this.props.searchBy == 'searchByLocation'}
                            onChange={this.props.onChange}
                        />
                        <Form.Radio
                            label='Name'
                            name='searchBy'
                            value='searchByName'
                            checked={this.props.searchBy == 'searchByName'}
                            onChange={this.props.onChange}
                        />
                        <Form.Radio
                            label='Close & Good'
                            name='searchBy'
                            value='closerBetter'
                            checked={this.props.searchBy == 'closerBetter'}
                            onChange={this.props.onChange}
                        />
                        <Form.Radio
                            label='Name & Location'
                            name='searchBy'
                            value='searchByBoth'
                            checked={this.props.searchBy == 'searchByBoth'}
                            onChange={this.props.onChange}
                        />
                    </Form.Group>

                    <Form.Input
                        fluid label='Name'
                        placeholder='Name'
                        name='name'
                        onChange={this.props.onChange}
                    />
                    Location
                    <Geosuggest
                        placeholder='Location'
                        onSuggestSelect={this.props.onSuggestSelect} />
                    <Form.Input
                        fluid label="Minimum Average"
                        placeholder="0"
                        name='average'
                        onChange={this.props.onChange}
                        type='number'
                        min='0'
                        max='5'
                    />
                    {this.props.searchBy == 'closerBetter' &&
                        <Grid columns={1}>
                            <Grid.Column>
                                <Form.Input
                                    label={`Closer vs Better`}
                                    min={0}
                                    max={100}
                                    name='closerBetter'
                                    onChange={this.props.onChange}
                                    step={10}
                                    type='range'
                                    value={this.props.closerBetter}
                                />
                            </Grid.Column>
                        </Grid>}
                    <Button type='search'>Search</Button>
                </Form>
                <Card.Group>
                    {this.props.searchSuccess && this.props.searchSuccess.map((chain, idx) => {
                        return <div key={idx}>
                            <br />{`number ${idx + 1}`}
                            <div><Profile>
                                {{ restaurant: chain }}
                            </Profile>
                                <br /></div></div>
                    })}
                    {this.props.searchError && <Alert>this.props.searchError</Alert>}
                </Card.Group>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        searchBy: state['advanceSearch'].get('searchBy'),
        searchSuccess: state['advanceSearch'].get('searchSuccess'),
        searchError: state['advanceSearch'].get('searchError'),
        name: state['advanceSearch'].get('name'),
        location: state['advanceSearch'].get('location'),
        average: state['advanceSearch'].get('average'),
        closerBetter: state['advanceSearch'].get('closerBetter'),
        userLocation: state['login'].get('location')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (e, { name, value }) => {
            console.log("onChange=", name);
            dispatch(AdvanceSearchActions.updateValue(name, value));
        },
        onSearch: (props) => {
            let { name, searchBy, location, userLocation, closerBetter, average } = props
            dispatch(AdvanceSearchActions.search({ name, searchBy, location, userLocation, closerBetter, average }));
        },
        onSuggestSelect: (location) => {
            console.log(location);
            dispatch(AdvanceSearchActions.updateLocation(location));
        }
    }
}

let wrapper = GoogleApiWrapper({
    apiKey: 'AIzaSyD3QiGKOJxZN_GL6Bp0hGMz-cXyLqKEkSk'
})(AdvanceSearch)
export default connect(mapStateToProps, mapDispatchToProps)(wrapper);