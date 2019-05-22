import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert
} from "reactstrap";
import "./SignUp.css";
import Axios from "axios";

class SignUp extends Component {
  state = {
    username: null,
    name: null,
    email: null,
    password: null,
    error: null
  };

  handleChange = e => {
    // Change the state
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    // Prevent Button for refresh the page
    e.preventDefault();

    // Request sign-up to server / API
    Axios({
      method: "POST",
      url: "https://ade-chat-app.herokuapp.com/Sign-up",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        username: this.state.username,
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      }
    })
      .then(res => {
        this.props.isLogin();
        this.props.history.push("/chatroom");
      })

      .catch(err => {
        this.setState({
          error: err.response.data.message
        });
        setTimeout(() => {
          this.setState({
            error: null
          });
        }, 3000);
      });
  };

  render() {
    return (
      <Container className="center-container">
        {this.state.error && (
          <Alert color="danger" className="alert">
            {this.state.error}
          </Alert>
        )}
        <Form
          onSubmit={this.handleSubmit}
          className="border border-primary p-3 rounded form"
        >
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
              onChange={this.handleChange}
            />
            <Label for="name">Name</Label>
            <Input
              className="mb-2"
              type="text"
              required
              name="name"
              id="name"
              placeholder="Name"
              onChange={this.handleChange}
            />
            <Label for="email">Email</Label>
            <Input
              className="mb-2"
              type="email"
              name="email"
              required
              id="email"
              placeholder="Email"
              onChange={this.handleChange}
            />
            <Label for="password">Password</Label>
            <Input
              className="mb-2"
              type="password"
              required
              name="password"
              id="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button type="submit" color="primary">
            SignUp
          </Button>
          <Link to="SignIn" className="float-right">
            or Login
          </Link>
        </Form>
      </Container>
    );
  }
}

export default SignUp;
