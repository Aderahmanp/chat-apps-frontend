import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem, Container } from "reactstrap";
import axios from "axios";
import PropTypes from "prop-types";

import placeholder from "../assets/profile-placeholder.jpg";

import "./ChatSlidebar.scss";

class ChatSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      errorLog: "",
      token: localStorage.getItem("token")
    };

    this.renderListName = this.renderListName.bind(this);
  }

  componentWillMount() {
    const { token } = this.state;
    axios
      .get("http://localhost:4322/member", {
        headers: { Authorization: token }
      })
      .then(response => {
        this.setState({
          users: response.data.data
        });
      })
      .catch(err => {
        alert(err);
      });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  renderListName() {
    const { users } = this.state;
    const { handleClick } = this.props;
    return (
      users.length > 0 &&
      users.map(user => {
        return (
          <ListGroupItem
            className="listgroup--parent"
            key={user.name}
            onClick={() => {
              handleClick(user._id);
            }}
          >
            <img
              alt={user.name}
              src={placeholder}
              className="listgroup--parent__img"
            />
            <div className="listgroup--parent__text">{user.name}</div>
          </ListGroupItem>
        );
      })
    );
  }

  render() {
    return (
      <Container>
        <h3>List User</h3>
        <ListGroup>{this.renderListName()}</ListGroup>
      </Container>
    );
  }
}

ChatSidebar.propTypes = {
  handleClick: PropTypes.func.isRequired
};

export default ChatSidebar;
