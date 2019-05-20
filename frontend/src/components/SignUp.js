import React, { Component } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./SignUp.css";

class SignUp extends Component {
  render() {
    return (
      <Container className="center-container">
        <Form className="border border-primary p-3 rounded form">
          <h1>Sign Up</h1>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              className="mb-2"
              type="text"
              required
              name="username"
              id="username"
              placeholder="Username"
            />
            <Label for="name">Name</Label>
            <Input
              className="mb-2"
              type="text"
              required
              name="name"
              id="name"
              placeholder="Name"
            />
            <Label for="email">Email</Label>
            <Input
              className="mb-2"
              type="email"
              required
              id="email"
              placeholder="Email"
            />
            <Label for="password">Password</Label>
            <Input
              className="mb-2"
              type="password"
              required
              name="password"
              id="password"
              placeholder="Password"
            />
          </FormGroup>
          <Button color="primary">SignUp</Button>
          <a href="SignIn" className="float-right">
            or Login
          </a>
        </Form>
      </Container>
    );
  }
}

export default SignUp;
