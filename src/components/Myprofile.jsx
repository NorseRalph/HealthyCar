import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from "../reducers/userReducer"; // Import fetchUserDetails
import profilePic from "../icons/profile.svg"; // Path to the profile picture image
import LoadingComponent from "./LoadingComponent";

const MyProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.userData);
    const isLoading = useSelector(state => state.user.isLoading);
    const error = useSelector(state => state.user.error);
  
    useEffect(() => {
      const userId = localStorage.getItem("userId"); // Or fetch from a suitable source
      if (userId) {
        dispatch(fetchUserDetails(userId)); // Dispatch action to load user details
      }
    }, [dispatch]);
  
    if (isLoading) {
      return <div>Loading profile...</div>;
    }
  
    if (error) {
      return <LoadingComponent />;
    }
  

  return (
    <div className="my-profile">
      <div className="my-profile__card">
        <div className="my-profile__image-wrapper">
          <img src={profilePic} alt="Profile" className="my-profile__image" />
        </div>
        <div className="my-profile__details">
          <div className="my-profile__detail">
            <span className="my-profile__detail-label">Name:</span>
            <span className="my-profile__detail-value">{user.firstName} {user.lastName}</span>
          </div>
          <div className="my-profile__detail">
            <span className="my-profile__detail-label">Email address</span>
            <span className="my-profile__detail-value">{user.email}</span>
          </div>
          <div className="my-profile__detail">
            <span className="my-profile__detail-label">Subscription type</span>
            <span className="my-profile__detail-value">Regular</span>
          </div>
          <div className="my-profile__detail">
            <span className="my-profile__detail-label">Number of Cars</span>
            <span className="my-profile__detail-value">{user.carCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
