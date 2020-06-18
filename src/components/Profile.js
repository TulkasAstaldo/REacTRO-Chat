import React from "react";
import { auth, db } from "../services/firebase";
import "./Profile.css";

const Profile = (props) => {
  const user = auth().currentUser;

  return (
    <section className="CurrentUser">
      <div className="CurrentUser--profile">
        {user.photoURL ? (
          <img src={user.photoURL} alt={user.displayName} />
        ) : (
          <img
            src="https://img.icons8.com/officel/80/000000/no-image.png"
            alt="None"
          />
        )}
        <div className="CurrentUser--information">
          <h2>{user.displayName}</h2>
          <p className="email">{user.email}</p>
          <p className="created-at">{""}</p>
        </div>
      </div>
      <div>
        <button className="btn" onClick={auth().signOut}>
          Sign Out
        </button>
      </div>
    </section>
  );
};

export default Profile;
