import React from "react";

const userContext = React.createContext();

useEffect(() => {
  auth().onAuthStateChanged((user) => {
    if (user) {
      setAuthenticated(true);
      setLoading(false);
      setUsers(users.push(user.displayName));
      console.log(users);
    } else {
      setAuthenticated(false);
      setLoading(false);
    }
  });
}, []);

const signOut = (props) => {
  setUsers(props.users.filter((user) => props.user === user.displayName));
  auth().signOut();
};
