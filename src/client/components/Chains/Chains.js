import React from 'react'
import { connect } from 'react-redux'
import ChainsActions from '../Chains/actions'
import { Link } from "react-router-dom";
import { Button, Card } from 'semantic-ui-react'
class Chains extends React.Component {

  render() {

    return (
      <div className="chains-root">
        <Card.Group>
          {
            this.props.chains.map((chain, idx) => {
              return (
                <Card key={idx}>
                  <Card.Content>
                    <Card.Header>{chain.name}</Card.Header>
                    <Card.Meta>Rating</Card.Meta>
                    <Card.Meta>Location</Card.Meta>
                  </Card.Content>
                  <Card.Content extra>
                    <div className='ui two buttons'>
                      <Link to={`/chain/${chain.name}`}>
                        <Button basic color='green'>
                          View more
                                </Button>
                      </Link>
                    </div>
                  </Card.Content>
                </Card>

              )
            })
          }
        </Card.Group>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    chains: state['chains'].get('chains')
  }
}


export default connect(mapStateToProps)(Chains);
