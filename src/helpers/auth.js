import { auth } from "../services/firebase";

export const signUp = (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

export const signIn = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const signInWithGoogle = () => {
  const provider = new auth.GithubAuthProvider();
  return auth.signInWithPopup(provider);
};
