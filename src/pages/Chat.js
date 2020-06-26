import React, { useContext } from "react";
import useChat from "../hooks/useChat";
import "./Chat.css";
import { UserContext } from "../Context";

const Chat = () => {
  const { user } = useContext(UserContext);
  const {
    chats,
    content,
    writeError,
    loadingChats,
    myRef,
    handleChange,
    handleSubmit,
    formatTime,
  } = useChat();

  return (
    <>
      <main className="chat-container">
        <aside className="chat-users">active users: {}</aside>
        <div className="chat-area" ref={myRef}>
          {loadingChats ? (
            <div>
              <span>Loading...</span>
            </div>
          ) : (
            ""
          )}
          {chats.map((chat) => (
            <p
              key={chat.timestamp}
              className={`chat-bubble ${
                user.uid === chat.uid ? "current-user" : ""
              }`}
            >
              <span className="username">{chat.user}:</span>
              <br />
              {chat.content}
              {chat.key}
              <br />
              <span className="chat-time">{formatTime(chat.timestamp)}</span>
            </p>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="chat-form">
          <input
            className="chat-text"
            value={content}
            onChange={handleChange}
          />
          {writeError && <p className="error-txt">{writeError}</p>}
          <button type="submit" className="btn" id="btn-submit">
            Send
          </button>
        </form>
        <div className="loggedin">
          Logged In as : <strong>{user.displayName}</strong>
        </div>
      </main>
    </>
  );
};

export default Chat;
