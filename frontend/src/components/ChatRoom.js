import React, { Component, Fragment } from "react";
import { Container, Row, Col } from "reactstrap";
import "./ChatRoom.scss";
import ChatSidebar from "./ChatSlidebar";
import ChatMain from "./ChatMain";
import axios from "axios";

class ChatRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeChat: [],
      activeIndexChat: null
    };

    this.handleClickUser = this.handleClickUser.bind(this);
  }

  handleClickUser(idUser, index) {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:4322/message/${idUser}`, {
        headers: { Authorization: token }
      })
      .then(response => {
        const { data: chats } = response.data;
        this.setState({
          activeChat: chats,
          activeIndexChat: index
        });
      })
      .catch(err => {
        alert(
          (err && err.response && err.response.message) ||
            "Error in generating chats"
        );
      });
  }

  render() {
    const { activeChat, activeIndexChat } = this.state;
    const showChatMain = activeIndexChat !== null && (
      <ChatMain chats={activeChat} />
    );
    return (
      <div className="chat-room--container">
        <Row>
          <Col xs="2">
            <ChatSidebar
              handleClick={this.handleClickUser}
              active={activeIndexChat}
            />
          </Col>
          <Col xs="9">{showChatMain}</Col>
        </Row>
      </div>
    );
  }
}

export default ChatRoom;
