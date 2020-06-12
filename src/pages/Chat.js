import React, { Component } from "react";
import { auth, db } from "../services/firebase";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      chats: [],
      content: "",
      readError: null,
      writeError: null,
      loadingChats: false,
    };
    this.myRef = React.createRef();
  }

  componentDidMount = async () => {
    this.setState({ readError: null, loadingChats: true });
    const chatArea = this.myRef.current;
    try {
      db.ref("chats").on("value", (snapshot) => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        chats.sort((a, b) => a.timestamp - b.timestamp);
        this.setState({ chats });
        chatArea.scrollBy(0, chatArea.scrollHeight);
        this.setState({ loadingChats: false });
      });
    } catch (error) {
      this.setState({ readError: error.message, loadingChats: false });
    }
  };

  handleChange = (e) => {
    this.setState({
      content: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ writeError: null });
    const chatArea = this.myRef.current;
    try {
      await db.ref("chats").push({
        content: this.state.content,
        timestamp: Date.now(),
        uid: this.state.user.uid,
      });
      this.setState({ content: "" });
      chatArea.scrollBy(0, chatArea.scrollHeight);
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  };

  formatTime(timestamp) {
    const d = new Date(timestamp);
    const time = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}/${d.getHours()}/${d.getMinutes()}`;
    return time;
  }

  render() {
    return (
      <div>
        <div className="chat-area" ref={this.myRef}>
          {this.state.loadingChats && (
            <div>
              <span>Loading...</span>
            </div>
          )}
          {this.state.chats.map((chat) => (
            <p
              key={chat.timestamp}
              className={`chat bubble ${
                this.state.user.uid === chat.uid ? "current-user" : ""
              }`}
            >
              {chat.content}
              <br />
              <span chat-time>{this.formatTime(chat.timestamp)}</span>
            </p>
          ))}
        </div>
        <form onSubmit={this.handleSubmit} className="chat-form">
          <textarea
            className="chat-text"
            value={this.state.content}
            onChange={this.handleChange}
          />
          {this.state.error && (
            <p className="error-txt">{this.state.writeError}</p>
          )}
          <button type="submit">Send</button>
        </form>
        <div>
          Logged In as : <strong>{this.state.user.email}</strong>
        </div>
      </div>
    );
  }
}
