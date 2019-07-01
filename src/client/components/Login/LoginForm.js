import React, { Fragment, useCallback } from "react";
import { Form, Button, Checkbox, Header, Icon, Input } from "semantic-ui-react";

class LoginForm extends React.Component {

    render(){
        console.log("LoginForm=", this.props);
        return (

            <Form onSubmit={this.props.handleSubmit}>
            <Header textAlign="center">Login your account.</Header>
            <Form.Field
                label="User Name"
                onChange={this.props.handleOnChange}
                name="username"
                control={Input}
                type="text"
                placeholder="User Name"
            />
            <Form.Field
                label="Password"
                onChange={this.props.handleOnChange}
                name="password"
                control={Input}
                type="password"
                placeholder="********"
            />
            <Button type="login" color="yellow" size="medium" fluid>
                {this.props.loadingloading ? (
                <Fragment>
                    <Icon loading name="spinner" />
                    Log in...
                </Fragment>
                ) : (
                "Log in"
                )}
            </Button>
            </Form>
            
        );
    }
}
export default LoginForm;