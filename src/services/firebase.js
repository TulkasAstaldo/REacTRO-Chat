import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD6rS2yuKuj0Nx2a04WlPSvcOqjWBA6zOM",
  authDomain: "chat-app-32755.firebaseapp.com",
  databaseURL: "https://chat-app-32755.firebaseio.com",
  projectId: "chat-app-32755",
  storageBucket: "chat-app-32755.appspot.com",
  messagingSenderId: "596480986887",
  appId: "1:596480986887:web:cf905846430279d476ffa2",
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
        photoUrl: photoUrl || null,
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
