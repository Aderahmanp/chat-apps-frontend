import React, { Component, Fragment } from "react";
import { Container, Row, Col } from "reactstrap";
import "./ChatRoom.css";
import "./ChatSlidebar";

class ChatRoom extends Component {
  render() {
    return (
      <Fragment>
        Ini Chat page
        <row>
          <Col xs="2" ChatSlidebar>
            ChatSlidebar
          </Col>
          <Col xs="10">.col-6</Col>
        </row>
      </Fragment>
    );
  }
}

export default ChatRoom;
