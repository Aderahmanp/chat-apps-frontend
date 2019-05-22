import React, { Component } from "react";
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
      me: {},
      token: localStorage.getItem("token")
    };

    this.renderListName = this.renderListName.bind(this);
  }

  componentWillMount() {
    const { token } = this.state;
    axios
      .get("https://ade-chat-app.herokuapp.com/member", {
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

    axios
      .get("https://ade-chat-app.herokuapp.com/me", {
        headers: { Authorization: token }
      })
      .then(response => {
        const { data: user } = response.data;
        this.setState({
          me: user
        });
      })
      .catch(err => {
        alert(
          (err && err.response && err.response.message) ||
            "Error in generating chats"
        );
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
    const { users, me } = this.state;
    const { handleClick, active } = this.props;
    return (
      users.length > 0 &&
      users.map((user, index) => {
        const activeSidebar =
          active !== null && active === index
            ? {
                backgroundColor: "#ECF6EE"
              }
            : { backgroundColor: "#FFFFFF" };
        return (
          user._id !== me._id && (
            <ListGroupItem
              className="listgroup--parent"
              key={user.name}
              onClick={() => {
                handleClick(user._id, index);
              }}
              style={activeSidebar}
            >
              <img
                alt={user.name}
                src={placeholder}
                className="listgroup--parent__img"
              />
              <div className="listgroup--parent__text">{user.name}</div>
            </ListGroupItem>
          )
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
  handleClick: PropTypes.func.isRequired,
  active: PropTypes.number
};

export default ChatSidebar;
