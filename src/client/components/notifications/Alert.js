import React, { Fragment } from "react";
import { Message } from "semantic-ui-react";

class Alert extends React.Component {
  constructor(message) {
    super();
    this.message = message.children;
    console.log("Alert=", message.children);
  }
  render() {
    return (
      <Fragment>
        <Message className={this.type}>
          <Message.Header as="h5"> {this.message} </Message.Header>
        </Message>
      </Fragment>
    );
  }
}

export default Alert;