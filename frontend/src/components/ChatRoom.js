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
      activeChat: []
    };

    this.handleClickUser = this.handleClickUser.bind(this);
  }

  handleClickUser(idUser) {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:4322/message/${idUser}`, {
        headers: { Authorization: token }
      })
      .then(response => {
        const { data: chats } = response.data;
        this.setState({
          activeChat: chats
        });
      })
      .catch(err => {
        console.log(
          (err && err.response && err.response.message) ||
            "Error in generating chats"
        );
      });
  }

  render() {
    const { activeChat } = this.state;
    return (
      <div className="chat-room--container">
        <Row>
          <Col xs="2">
            <ChatSidebar handleClick={this.handleClickUser} />
          </Col>
          <Col xs="10">
            <ChatMain chats={activeChat} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default ChatRoom;
