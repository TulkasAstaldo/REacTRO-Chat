import { firestore } from "../services/firebase";

export function readChats() {
  let abc = [];
  firestore
    .collection("chats")
    .get()
    .on("value", (snapshot) => {
      snapshot.forEach((snap) => {
        abc.push(snap.val());
      });
      return abc;
    });
}

export function writeChats(message) {
  return firestore.collection("chats").doc().set({
    content: message.content,
    timestamp: message.timestamp,
    uid: message.uid,
  });
}
