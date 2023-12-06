import React, { useEffect } from "react";
import LoadingComponent from "./LoadingComponent";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from "../reducers/userReducer";

const WelcomeBox = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.userData);
  const error = useSelector(state => state.user.error);

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Or fetch from a suitable source
    if (userId) {
      dispatch(fetchUserDetails(userId)); // Dispatch action to load user details
    }
  }, [dispatch]);

  if (error) {
    return <LoadingComponent />;
  }

  return (
    <div className="welcome-box">
      <h1 className="welcome-box__title">Welcome, {user.firstName}</h1>
      <p className="welcome-box__message">
        Congratulations! Your registration was successful, and we're thrilled to
        have you on board. Here's what you can do next:
      </p>
      <ol className="welcome-box__list">
        <li className="welcome-box__list-item">
          Log In: Head to our login page and enter your credentials to access
          your account.
        </li>
        <li className="welcome-box__list-item">
          Complete Your Profile: Enhance your experience by completing your
          profile. Add a profile picture and customize your settings.
        </li>
        <li className="welcome-box__list-item">
          Explore Our Features: Discover the exciting features that await you.
        </li>
      </ol>
      <p className="welcome-box__footer">
        If you have any questions or need assistance, feel free to contact our
        support team or explore our FAQ section.
      </p>
    </div>
  );
};

export default WelcomeBox;
