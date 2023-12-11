import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveUserAction } from "../reducers/userReducer";
import Popup from "./Popup";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPopupMessage("New passwords do not match");
      return;
    }
    // Additional validations can be added here

    const userId = localStorage.getItem("userId"); // Assuming you store user ID in local storage
    dispatch(saveUserAction({ id: userId, password: newPassword }))
      .then(() => {
        setPopupMessage("Password successfully changed");
      })
      .catch((error) => {
        setPopupMessage(error.message || "Failed to change password");
      });
  };

  return (
    <div className="change-password">
      <h1 className="change-password__header">Change Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="change-password__input-group">
          <label className="change-password__label">Current Password</label>
          <input
            className="change-password__input"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        <div className="change-password__input-group">
          <label className="change-password__label">New Password</label>
          <input
            className="change-password__input"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="change-password__input-group">
          <label className="change-password__label">Confirm New Password</label>
          <input
            className="change-password__input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button className="change-password__submit-button" type="submit">
          Change Password
        </button>
      </form>
      {popupMessage && <Popup message={popupMessage} />}
    </div>
  );
};

export default ChangePassword;
