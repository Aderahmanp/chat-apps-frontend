import React from "react";
import {
  FormGroup,
  Input,
  Button,
  Row,
  Col,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import PropTypes from "prop-types";
import moment from "moment";
import axios from "axios";
import _ from "lodash";

import "./ChatMain.scss";

class ChatMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      me: {}
    };

    this.renderChats = this.renderChats.bind(this);
  }

  componentWillMount() {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:4322/me", { headers: { Authorization: token } })
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

  renderChats(chats) {
    const { me } = this.state;
    return (
      !_.isEmpty(me) &&
      chats.map(chat => {
        const { from } = chat;
        const { _id: idMe } = me;
        const isFromMe = from === idMe;

        // styling chat
        const positionChat = isFromMe
          ? { textAlign: "right" }
          : { textAlign: "left" };

        const contentColor = isFromMe
          ? { backgroundColor: "#ffffff", color: "#000000" }
          : { backgroundColor: "#4caf50", color: "#ffffff" };

        return (
          <div
            className="chat-content--container"
            style={positionChat}
            key={chat._id}
          >
            <div
              className="chat-content--container__message"
              style={contentColor}
            >
              {chat.message}
            </div>
            <div className="chat-content--container__date">
              {moment(chat.date).format("DD MMM YYYY")}
            </div>
          </div>
        );
      })
    );
  }

  render() {
    const { chats } = this.props;
    const showContentChat =
      chats.length === 0 ? <h2>No Chat Available</h2> : this.renderChats(chats);
    return (
      <div className="chat-main--container">
        <FormGroup>
          <div className="chat-content--parent-container">
            {showContentChat}
          </div>
          <InputGroup>
            <Input placeholder="Type a message..." />
            <InputGroupAddon addonType="append">
              <Button color="info">Send</Button>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>
      </div>
    );
  }
}

ChatMain.propTypes = {
  chats: PropTypes.array.isRequired
};

export default ChatMain;
