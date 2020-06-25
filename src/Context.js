import React, { useState, useEffect } from "react";
import { createUserProfileDocument, auth } from "./services/firebase";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapshot) => {
          setUser({ uid: snapshot.id, ...snapshot.data() });
        });
        setAuthenticated(true);
        setLoading(false);
      } else {
        setAuthenticated(false);
        setLoading(false);
      }
      setUser(userAuth);
    });
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        authenticated,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
