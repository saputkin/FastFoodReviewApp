import React from 'react'
import { Form, Input, TextArea, Button, Select, Rating, Icon } from 'semantic-ui-react'
import DropZone from '../Register/DropZone';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import ChainsActions from './actions'


class EditReview extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      reviewerName: this.props.toEdit.reviewerName,
      restaurantName: this.props.toEdit.restaurantName,
      creationDate: this.props.toEdit.creationDate,
      bathroom: this.props.toEdit.bathroom,
      staff: this.props.toEdit.staff,
      clean: this.props.toEdit.clean,
      food: this.props.toEdit.food,
      drive: this.props.toEdit.drive,
      delivery: this.props.toEdit.delivery,
      average: this.props.toEdit.average,
      photos: this.props.toEdit.photos
    }
  }

  handleRate = (e, { rating, className }) => {
    console.log(className, " RATED ", rating)
    this.setState({
      [className]: rating
    })
  }

  onDrop = (files) => {
    let reader = new FileReader()
    for (var i = 0; i < files.length; i++) {
      reader.readAsDataURL(files[i]);
      reader.onload = () => {
        var photos = this.state.photos;
        photos.push(reader.result)
        this.setState({
          photos: photos
        })
      }
    }
  }

  handleImageDelete = (idx) => {
    var photosRemove = this.state.photos
    photosRemove.splice(idx, 1)
    this.setState({
      photos: photosRemove
    })
  }


  render() {
    const rate_style = { width: "40%", margin: 'auto' }
    return (
      <div style={rate_style}>
        <h2>Edit Review:</h2>
        <Form >
          <Form.Group widths='equal'>
            <Form.Field style={rate_style}>
              Bathroom quality:
                  <Rating icon='star' className="bathroom" defaultRating={this.state.bathroom} maxRating={5} onRate={this.handleRate} />
            </Form.Field>
            <Form.Field style={rate_style}>
              Staff Kindness:
                  <Rating icon='star' className="staff" defaultRating={this.state.staff} maxRating={5} onRate={this.handleRate} />
            </Form.Field>
            <Form.Field style={rate_style}>
              Cleanliness:
                  <Rating icon='star' className="clean" defaultRating={this.state.clean} maxRating={5} onRate={this.handleRate} />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field style={rate_style}>
              Food Quality:
                  <Rating icon='star' className="food" defaultRating={this.state.food} maxRating={5} onRate={this.handleRate} />
            </Form.Field>
            <Form.Field style={rate_style}>
              Drive-thru quality:
                  <Rating icon='star' className="drive" defaultRating={this.state.drive} maxRating={5} onRate={this.handleRate} clearable />
            </Form.Field>
            <Form.Field style={rate_style}>
              Delivery Speed:
                  <Rating icon='star' className="delivery" defaultRating={this.state.delivery} maxRating={5} onRate={this.handleRate} clearable />
            </Form.Field>
          </Form.Group>
          photos:
              <Form.Group widths='equal'>
            {this.state.photos.map((img, idx) => {
              return (
                <div key={idx} style={{ backgroundImage: 'url(' + img + ')', width: "150px", height: "150px", backgroundSize: 'cover', overflow: 'hidden' }}>
                  <div>
                    <Button onClick={() => this.handleImageDelete(idx)}>
                      <Icon name='delete' />
                    </Button>
                  </div>
                </div>
              )
            })}
          </Form.Group>
          <DropZone onDrop={this.onDrop} />
          <Link to={`/chain/${this.state.restaurantName}`}>
            <Form.Field
              id='form-button-control-public'
              control={Button}
              content='Confirm'
              onClick={() => this.props.editReviewHandler(this.state)}
            />
          </Link>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    toEdit: state['chains'].get('toEdit')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editReviewHandler: (review) => {
      dispatch(ChainsActions.editReviewAction(review))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditReview)