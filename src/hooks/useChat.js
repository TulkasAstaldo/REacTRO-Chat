import { useState, useEffect, useRef, useContext } from "react";
import { firestore } from "../services/firebase";
import { UserContext } from "../Context";

const useChat = () => {
  const { user } = useContext(UserContext);
  const [chats, setChats] = useState([]);
  const [content, setContent] = useState("");
  const [readError, setReadError] = useState(null);
  const [writeError, setWriteError] = useState(null);
  const [loadingChats, setLoadingChats] = useState(false);
  const myRef = useRef(null);

  const formatTime = (timestamp) => {
    const d = new Date(timestamp);
    const time =
      ("0" + d.getDate()).slice(-2) +
      "/" +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      "/" +
      d.getFullYear() +
      " " +
      ("0" + d.getHours()).slice(-2) +
      ":" +
      ("0" + d.getMinutes()).slice(-2);
    return time;
  };

  useEffect(() => {
    setReadError(null);
    setLoadingChats(true);
    const chatArea = myRef.current;
    const updateChats = firestore.collection("chats").onSnapshot(
      (snapshot) => {
        setLoadingChats(false);
        let chats = [];
        snapshot.docs.forEach((snap) => {
          chats.push(snap.data());
        });
        chats.sort((a, b) => a.timestamp - b.timestamp);
        setChats(chats);
        chatArea.scrollBy(0, chatArea.scrollHeight);
      },
      (error) => {
        setReadError(error.message);
        setLoadingChats(false);
      }
    );
    return () => updateChats();
  }, []);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWriteError(null);
    const chatArea = myRef.current;
    try {
      await firestore.collection("chats").doc().set({
        content: content,
        timestamp: Date.now(),
        uid: user.uid,
        user: user.displayName,
      });

      setContent("");
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
