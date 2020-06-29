import React, { useContext } from "react";
import { firestore, storage } from "../services/firebase";
import "./Profile.css";
import { UserContext } from "../Context";
import { useInput } from "../hooks/useInput";

const Profile = () => {
  const { value: displayName, reset, bind: bindDisplayName } = useInput("");
  let imageInput = null;
  const { user } = useContext(UserContext);
  let file;
  const uid = user.uid;

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
    reset();
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
        <p className="userName">{user.displayName}</p>
        <p className="email">{user.email}</p>
      </div>
      <div className="CurrentUser--information">
        <form className="profile-form" onSubmit={handleSubmit}>
          <p className="edit-profile">Edit your profile:</p>
          <label className="profile-lbl">
            <input
              className="profile-input"
              type="text"
              {...bindDisplayName}
              placeholder="New Username"
            />
          </label>
          <label className="profile-pic-lbl">
            Change profile picture
            <input
              style={{ display: "none" }}
              type="file"
              accept="image/gif, image/jpeg, image/png"
              ref={(ref) => (imageInput = ref)}
              onChange={fileChange}
            />
          </label>

          <button className="update" type="submit">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Profile;
