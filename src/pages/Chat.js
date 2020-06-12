import React from "react";
import useChat from "../hooks/useChat";

const Chat = () => {
  const {
    user,
    chats,
    content,
    readError,
    writeError,
    loadingChats,
    myRef,
    handleChange,
    handleSubmit,
    formatTime,
  } = useChat();

  return (
    <div>
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
            className={`chat bubble ${
              user.uid === chat.uid ? "current-user" : ""
            }`}
          >
            {chat.content}
            <br />
            <span className="chat-time">{formatTime(chat.timestamp)}</span>
          </p>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-form">
        <textarea
          className="chat-text"
          value={content}
          onChange={handleChange}
        />
        {writeError && <p className="error-txt">{writeError}</p>}
        <button type="submit">Send</button>
      </form>
      <div>
        Logged In as : <strong>{user.email}</strong>
      </div>
    </div>
  );
};

export default Chat;
