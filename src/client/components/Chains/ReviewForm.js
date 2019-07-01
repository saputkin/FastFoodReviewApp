
import React from 'react'
import { Form, Input, TextArea, Button, Select,Rating, Icon } from 'semantic-ui-react'
import DropZone from '../Register/DropZone';



class ReviewForm extends React.Component{

    render(){
        const rate_style = {width:"40%",margin:'auto'}
        return(
        <div style={rate_style}>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field style={rate_style}  >
              Bathroom quality:
              <Rating icon='star' className="bathroom" defaultRating={1} maxRating={5} onRate={this.props.handleRate}/>
            </Form.Field>
            <Form.Field style={rate_style}>
              Staff Kindness:
              <Rating icon='star' className="staff" defaultRating={1} maxRating={5} onRate={this.props.handleRate}/>
            </Form.Field>
            <Form.Field style={rate_style}>
              Cleanliness:
              <Rating icon='star' className="clean" defaultRating={1} maxRating={5} onRate={this.props.handleRate}/>
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field style={rate_style}>
              Food Quality:
              <Rating icon='star' className="food" defaultRating={1} maxRating={5} onRate={this.props.handleRate}/>
            </Form.Field>
            <Form.Field style={rate_style}>
            Drive-thru quality:
              <Rating icon='star' className="drive" defaultRating={0} maxRating={5} onRate={this.props.handleRate} clearable/>
            </Form.Field>
            <Form.Field style={rate_style}>
            Delivery Speed:
              <Rating icon='star' className="delivery" defaultRating={0} maxRating={5} onRate={this.props.handleRate} clearable/>
            </Form.Field>
          </Form.Group>
          <DropZone onDrop={this.props.onDrop} />
            <Form.Field
              id='form-button-control-public'
              control={Button} 
              content='Confirm'
              onClick={() => this.props.handleSubmit(this.props.jointId)}
            />
        </Form>
        </div>
        )
    }
}


export default ReviewForm