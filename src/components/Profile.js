import React, { useContext, useState } from "react";
import { auth, firestore, storage } from "../services/firebase";
import "./Profile.css";
import { UserContext } from "../Context";
import { useInput } from "../hooks/useInput";

const Profile = () => {
  const { value: displayName, bind: bindDisplayName } = useInput("");
  let imageInput = null;
  const { user } = useContext(UserContext);
  let file;
  const uid = auth().currentUser.uid;

  const userRef = firestore.doc(`/users/${uid}`);

  const fileChange = () => (file = imageInput ? imageInput.files[0] : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (displayName) {
      userRef.update({ displayName });
    }
    if (file) {
      storage
        .ref()
        .child("user-profiles")
        .child(uid)
        .child(file.name)
        .put(file)
        .then((response) => response.ref.getDownloadURL())
        .then((photoUrl) => userRef.update({ photoUrl }));
    }
  };

  return (
    <section className="CurrentUser">
      <div className="user-details">
        <img
          className="user-img"
          src={`${user.photoUrl}`}
          referrerPolicy="no-referrer"
          alt={user.displayName}
        />
        <h4>{user.displayName}</h4>
        <p className="email">{user.email}</p>
      </div>
      <div className="CurrentUser--information">
        <form onSubmit={handleSubmit}>
          <label className="profile-lbl">
            <input
              type="text"
              {...bindDisplayName}
              placeholder="Display Name"
            />
          </label>

          <label className="profile-lbl">
            <input
              type="file"
              accept="image/gif, image/jpeg, image/png"
              ref={(ref) => (imageInput = ref)}
              onChange={fileChange}
            />
          </label>
          <label className="profile-lbl">
            <input className="update" type="submit" />
          </label>
        </form>
      </div>
    </section>
  );
};

export default Profile;
