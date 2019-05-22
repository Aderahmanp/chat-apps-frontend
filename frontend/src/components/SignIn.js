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
import "./SignIn.css";
import Axios from "axios";

class Login extends Component {
  state = {
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

    // Request login to server / API
    Axios({
      method: "POST",
      url: "https://ade-chat-app.herokuapp.com/sign-in",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        email: this.state.email,
        password: this.state.password
      }
    })
      .then(res => {
        localStorage.setItem("token", res.data.data.token);
        this.props.isLogin(res.data.token);
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
          <h1>Login</h1>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              className="mb-2"
              type="text"
              name="email"
              id="email"
              placeholder="email or username"
              onChange={this.handleChange}
            />
            <Label for="password">password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button type="submit" color="primary">
            Login
          </Button>
          <Link to="/Signup" className="float-right">
            or register
          </Link>
        </Form>
      </Container>
    );
  }
}

export default Login;
