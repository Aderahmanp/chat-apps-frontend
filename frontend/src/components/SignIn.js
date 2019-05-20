import React, { Component } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./SignIn.css";

class Login extends Component {
  render() {
    return (
      <Container className="center-container">
        <Form className="border border-primary p-3 rounded">
          <h1>Login</h1>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              className="mb-2"
              type="text"
              name="email"
              id="email"
              placeholder="email or username"
            />
            <Label for="password">password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </FormGroup>
          <Button color="primary">Login</Button>
          <a href="Signup" className="float-right">
            or register
          </a>
        </Form>
      </Container>
    );
  }
}

export default Login;
