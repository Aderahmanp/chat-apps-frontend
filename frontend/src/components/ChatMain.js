import React from "react";
import {
  FormGroup,
  Input,
  Button,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import PropTypes from "prop-types";
import moment from "moment";
import axios from "axios";
import lodash from "lodash";

import "./ChatMain.scss";

// ref

class ChatMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      me: {},
      chat: "",
      showContentChat: <h2>No Chat Available</h2>
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
        alert(err);
      });
  }

  componentWillUnmount() {
    this.setState({
      chat: ""
    });
  }

  componentDidMount() {
    this.scrollToBottom(this.messageEnd);
  }

  componentDidUpdate(prevProps) {
    const { chats } = prevProps;
    const { chats: nextChat } = this.props;
    if (!lodash.isEqual(chats, nextChat)) {
      this.scrollToBottom(this.messageEnd);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { chats } = nextProps;
    this.setState({
      showContentChat: this.renderChats(chats)
    });
  }

  renderChats(chats) {
    const { me } = this.state;
    return (
      !lodash.isEmpty(me) &&
      chats.map((chat, index) => {
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

        if (index === chats.length - 1) {
          return (
            <div
              className="chat-content--container"
              style={positionChat}
              key={chat._id}
              ref={el => {
                this.messageEnd = el;
              }}
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
        }

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

  scrollToBottom(el) {
    el && el.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    const { onSendBtn } = this.props;
    const { chat, showContentChat } = this.state;

    return (
      <div className="chat-main--container">
        <FormGroup>
          <div className="chat-content--parent-container">
            {showContentChat}
          </div>
          <InputGroup>
            <Input
              placeholder="Type a message..."
              onChange={e => {
                this.setState({
                  chat: e.target.value
                });
              }}
              value={chat}
            />
            <InputGroupAddon addonType="append">
              <Button
                color="info"
                onClick={() => {
                  this.setState({
                    chat: ""
                  });
                  onSendBtn(chat);
                }}
              >
                Send
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>
      </div>
    );
  }
}

ChatMain.propTypes = {
  chats: PropTypes.array.isRequired,
  onSendBtn: PropTypes.func
};

export default ChatMain;
