import firebase from "firebase";

const config = {
  apiKey: "AIzaSyD6rS2yuKuj0Nx2a04WlPSvcOqjWBA6zOM",
  authDomain: "chat-app-32755.firebaseapp.com",
  databaseURL: "https://chat-app-32755.firebaseio.com",
  projectId: "chat-app-32755",
  storageBucket: "chat-app-32755.appspot.com",
  messagingSenderId: "596480986887",
  appId: "1:596480986887:web:cf905846430279d476ffa2",
};
firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
