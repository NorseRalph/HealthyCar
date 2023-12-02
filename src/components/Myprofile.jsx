import React from "react";
import profilePic from "../icons/profile.svg"; // Path to the profile picture image

const MyProfile = () => {
  return (
    <div className="my-profile">
      <div className="my-profile__card">
        <div className="my-profile__image-wrapper">
          <img src={profilePic} alt="Profile" className="my-profile__image" />
        </div>
        <div className="my-profile__details">
          <div className="my-profile__detail">
            <span className="my-profile__detail-label">Name:</span>
            <span className="my-profile__detail-value">Mark1234</span>
          </div>
          <div className="my-profile__detail">
            <span className="my-profile__detail-label">Email address</span>
            <span className="my-profile__detail-value">mark@gmail.com</span>
          </div>
          <div className="my-profile__detail">
            <span className="my-profile__detail-label">Subscription type</span>
            <span className="my-profile__detail-value">Regular</span>
          </div>
          <div className="my-profile__detail">
            <span className="my-profile__detail-label">Number of Cars</span>
            <span className="my-profile__detail-value">1</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
