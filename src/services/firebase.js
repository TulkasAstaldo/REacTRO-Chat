import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAoZS2-fWxPAYmqU_ug-qphj9hfE0AD2Q0",
  authDomain: "reactro-chat.firebaseapp.com",
  databaseURL: "https://reactro-chat.firebaseio.com",
  projectId: "reactro-chat",
  storageBucket: "reactro-chat.appspot.com",
  messagingSenderId: "508300852800",
  appId: "1:508300852800:web:82c7f76c999dc67c7969a5",
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;
export const firestore = firebase.firestore();
export const storage = firebase.storage();

firestore.settings = { timestampsInSnapshots: true };

window.firebase = firebase;

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoUrl } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName: displayName,
        email,
        photoUrl: auth().currentUser.photoURL || null,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user", error.message);
    }
  }
  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    return await firestore.collection("users").doc(uid);
  } catch (error) {
    console.error("Error fetching user data", error.message);
  }
};

// export const getUserDocument = async (uid) => {
//   if (!uid) return null;
//   try {
//     const userDocument = await firestore.collection("users").doc(uid).get();

//     return { uid, ...userDocument.data() };
//   } catch (error) {
//     console.error("Error fetching user data", error.message);
//   }
// };
export default firebase;
