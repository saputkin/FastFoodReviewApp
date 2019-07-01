import React from 'react'
import { Form, Rating } from 'semantic-ui-react'
import Image from '../Image'


class Review extends React.Component {

  render() {
    const rate_style = { width: "40%", margin: 'auto' }
    return (
      <Form >
        <Form.Group widths='equal'>
          <Form.Field style={rate_style}  >
            Bathroom quality:
                  <Rating icon='star' className="bathroom" rating={this.props.rev.bathroom} maxRating={5} disabled />
          </Form.Field>
          <Form.Field style={rate_style}>
            Staff Kindness:
                  <Rating icon='star' className="staff" rating={this.props.rev.staff} maxRating={5} disabled />
          </Form.Field>
          <Form.Field style={rate_style}>
            Cleanliness:
                  <Rating icon='star' className="clean" rating={this.props.rev.clean} maxRating={5} disabled />
          </Form.Field>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field style={rate_style}>
            Food Quality:
                  <Rating icon='star' className="food" rating={this.props.rev.food} maxRating={5} disabled />
          </Form.Field>
          <Form.Field style={rate_style}>
            Drive-thru quality:
                  <Rating icon='star' className="drive" rating={this.props.rev.drive} maxRating={5} disabled />
          </Form.Field>
          <Form.Field style={rate_style}>
            Delivery Speed:
                  <Rating icon='star' className="delivery" rating={this.props.rev.delivery} maxRating={5} disabled />
          </Form.Field>
        </Form.Group>
        photos:
              <Form.Group widths='equal'>
          {this.props.rev.photos.map((img, idx) => {
            return <Image key={idx} image={img} />
            // return <img key={idx} src={img} width="100px" height="100px" style={{borderStyle:'solid', borderWidth:5}}/>
          })}
        </Form.Group>
      </Form>
    )
  }
}

export default Review