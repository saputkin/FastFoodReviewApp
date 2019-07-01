import React, { Fragment } from "react";
import { Message } from "semantic-ui-react";
import { Card, Icon, Image, Button } from 'semantic-ui-react'
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import Review from '../Chains/Review'

/*
    Component Represent profile of a user or a restaurant with pic, and the ability to expand and watch the revies.
    
 */


class PresentProfile extends React.Component {
    constructor(data) {
        super();
        this.state = {
            clicked: false,
            user: data.children.user || null,
            restaurant: data.children.restaurant || null
        }
        this.user = data.children.user;
        this.restaurant = data.children.restaurant;
        console.log("Profile=", data.children);
    }

    fromProfileToCard = (name, location, chain, photo, phase, average = null) => {
        console.log(this.state);
        let stringPlace = `${name} ${phase}  ${location ? location.description : "unknowm place"}`;
        return (
            <div>
                <Card>
                    {photo ? <Image src={photo.base64} wrapped ui={false} /> : null}
                    {/* <Image src={photo.base64} wrapped ui={false} /> */}
                    <Card.Content>
                        <Card.Header>{name}</Card.Header>
                        <Card.Description>
                            <p> {stringPlace}</p> {stringPlace.length <= 40 && <br />}
                            {average ? <p>  {`${average}`} </p> : null}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <a>
                            <Icon name='user' />
                            {chain ? chain.length : 0} reviews
                    </a>
                        {/* <Router> */}
                        {this.state.restaurant &&
                            <Link to={`/chain/${name}`}>
                                <Button basic color='green'>
                                    {'View more'}
                                </Button>
                            </Link>
                        }
                        {
                            this.user &&
                            <Button id='profile' basic color='green' onClick={this.onClick.bind(this)}>
                                {`View ${name} Reviews`}
                            </Button>
                        }
                    </Card.Content>
                </Card>
                {
                    this.state.clicked && this.state.user &&
                    chain.map((rev, idx) => {
                        return (
                            <div key={idx}>
                                <h2 style={{ fontFamily: 'Anton, sans-serif' }}>
                                    {`${rev.restaurantName}`}
                                </h2>
                                <p>
                                    {`${rev.creationDate}`}
                                </p>
                                <Review rev={rev}> </Review>
                            </div>)
                    })
                }
            </div>
        );
    }

    onClick() {
        console.log('onClick=', !this.state.clicked);
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        if (this.state.user) {
            console.log('user=', this.state.user)
            let { username, location, photo, reviews } = this.state.user;
            //console.log('reviews=', reviews)
            return this.fromProfileToCard(username, location, reviews, photo, "lives in")
        }
        else if (this.state.restaurant) {
            console.log("restaurant=", this.restaurant)
            let { name, location, reviews, average } = this.restaurant;
            //console.log(average)
            return this.fromProfileToCard(name, location, reviews, null, "located in", "average score: " + average)
        }
        else return (<Message />);

    }
}

export default PresentProfile;