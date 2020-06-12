import { useState, useEffect, useRef } from "react";
import { auth, db } from "../services/firebase";

const useChat = () => {
  const [user, setUser] = useState(auth().currentUser);
  const [chats, setChats] = useState([]);
  const [content, setContent] = useState("");
  const [readError, setReadError] = useState(null);
  const [writeError, setWriteError] = useState(null);
  const [loadingChats, setLoadingChats] = useState(false);
  const myRef = useRef(null);

  const formatTime = (timestamp) => {
    const d = new Date(timestamp);
    const time = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    return time;
  };

  useEffect(() => {
    setReadError(null);
    setLoadingChats(true);
    const chatArea = myRef.current;
    try {
      db.ref("chats").on("value", (snapshot) => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        chats.sort((a, b) => a.timestamp - b.timestamp);
        setChats(chats);
        console.log(chats);
        chatArea.scrollBy(0, chatArea.scrollHeight);
        setLoadingChats(false);
      });
    } catch (error) {
      setReadError(error.message);
      setLoadingChats(false);
    }
  }, []);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWriteError(null);
    const chatArea = myRef.current;
    try {
      await db.ref("chats").push({
        content: content,
        timestamp: Date.now(),
        uid: user.uid,
      });

      setContent({ content: "" });
      chatArea.scrollBy(0, chatArea.scrollHeight);
    } catch (error) {
      setWriteError(error.message);
    }
  };

  return {
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
  };
};

export default useChat;
