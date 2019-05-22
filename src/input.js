import React from "react";

export default class App extends React.Component {
  checkEnter = (e) => {
    if (e.keyCode === 13) {
      this.props.sendMessage(this.refs.messageInput);
    }
  }

  render() {
    return (
      <div className="">
        <div className="bottom_wrapper">
          <div className="message_input_wrapper">
            <input
              ref="messageInput"
              type="text"
              className="message_input"
              placeholder="Enter your message"
              onKeyUp={this.checkEnter}
            />
          </div>
          <div
            className="send_message"
            onClick={() => this.props.sendMessage(this.refs.messageInput)}
            ref="inputMessage"
          >
            <div className="icon" />
            <div className="text">Send</div>
          </div>
        </div>
      </div>
    );
  }
}
