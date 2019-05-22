import React from "react";
import Messages from "./message-list";
import Input from "./input";
import _map from "lodash/map";
import io from "socket.io-client";

import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [{ id: 1, userId: 0, message: "Hello" }],
      user: null,
    };
    this.socket = null;
    this.myRef = React.createRef();
  }
  //Connetct server nodejs by socket io
  componentDidMount() {
    this.socket = io("localhost:8080");

    // Listen event id
    this.socket.on("id", res => this.setState({ user: res }));

    // Listen event newMessage
    this.socket.on("newMessage", response => {
      this.newMessage(response);
    });
  }
  
  // Callback when have newMessage
  newMessage(mess) {
    const messages = this.state.messages;
    let ids = _map(messages, "id");
    let max = Math.max(...ids);
    messages.push({
      id: max + 1,
      userId: mess.id,
      message: mess.data
    });

    this.setState({ messages });
  }

  // Sent event newMessage with message content
  sendnewMessage(mess) {
    if (mess.value) {
      // Sent event to server
      this.socket.emit("newMessage", mess.value);
      mess.value = "";
    }
  }

  render() {
    return (
      <div className="app__content">
        <div className="chat-container">
          <h1>Realtime Chat Appp</h1>
          <div className="chat-window">
            <Messages
              user={this.state.user}
              messages={this.state.messages}
              typing={this.state.typing}
              ref={this.myRef}
            />
            <Input sendMessage={this.sendnewMessage.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}
