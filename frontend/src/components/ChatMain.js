import React from "react";
import { FormGroup, Input, Button, Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import moment from "moment";

import "./ChatMain.scss";

class ChatMain extends React.Component {
  renderChats(chats) {
    return chats.map(chat => {
      return (
        <div className="chat-content--container">
          <div className="chat-content--container__message">{chat.message}</div>
          <div className="chat-content--container__date">
            {moment(chat.date).format("DD MMM YYYY")}
          </div>
        </div>
      );
    });
  }

  render() {
    const { chats } = this.props;
    const showContentChat =
      chats.length === 0 ? "No Chat Available" : this.renderChats(chats);
    return (
      <div className="chat-main--container">
        <FormGroup>
          <Row>
            <Col xs="10">
              <div className="chat-content--parent-container">
                {showContentChat}
              </div>
              <Input type="textarea" placeholder="Input the message" />
            </Col>
            <Col xs="2">
              <Button
                outline
                color="info"
                className="chat-main--container__send-btn"
              >
                Send
              </Button>
            </Col>
          </Row>
        </FormGroup>
      </div>
    );
  }
}

ChatMain.propTypes = {
  chats: PropTypes.array.isRequired
};

export default ChatMain;
