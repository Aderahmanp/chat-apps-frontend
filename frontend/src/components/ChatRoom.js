import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import "./ChatRoom.scss";
import ChatSidebar from "./ChatSlidebar";
import ChatMain from "./ChatMain";
import axios from "axios";

class ChatRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeChat: [],
      activeIndexChat: null,
      activeChatIdUser: null
    };

    this.handleClickUser = this.handleClickUser.bind(this);
    this.handleSendBtn = this.handleSendBtn.bind(this);
  }

  handleClickUser(idUser, index) {
    const token = localStorage.getItem("token");
    axios
      .get(`https://ade-chat-app.herokuapp.com/message/${idUser}`, {
        headers: { Authorization: token }
      })
      .then(response => {
        const { data: chats } = response.data;
        this.setState({
          activeChatIdUser: idUser,
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

  handleSendBtn(message) {
    const { activeChat, activeChatIdUser } = this.state;
    const token = localStorage.getItem("token");
    message !== "" &&
      axios
        .post(
          `https://ade-chat-app.herokuapp.com/message/${activeChatIdUser}`,
          { message },
          {
            headers: { Authorization: token }
          }
        )
        .then(response => {
          const { data: chat } = response.data;
          let activeChatsClone = activeChat.slice();
          activeChatsClone = activeChatsClone.concat([chat]);
          this.setState({
            activeChat: activeChatsClone
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
    const showChatMain = (
      <ChatMain chats={activeChat} onSendBtn={this.handleSendBtn} />
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
