import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem, Container } from "reactstrap";
import Axios from "axios";

class ChatSidebar extends Component {
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSuvmit = e => {
    e.preventDefault();

    Axios({
      method: "GET",
      url: "http://localhost:4322/member",
      headers: {
        "Content-Type": "application/json",
        Authorization: "token"
      }
    });
  };

  render() {
    return (
      <Container>
        <h3>Name</h3>
        <ListGroup>
          <ListGroupItem tag="a" href="#">
            name
          </ListGroupItem>
        </ListGroup>
      </Container>
    );
  }
}

export default ChatSidebar;
