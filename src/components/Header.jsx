// Header.js
import { NavLink, useLocation, useNavigate } from "react-router-dom"; // import NavLink from react-router
import HeaderIcon from "../icons/Logo.svg";
import homeIcon from "../icons/icon _home_.png";
import loginIcon from "../icons/account_login.svg";
import profileIcon from "../icons/icon _person_.svg";
import carIcon from "../icons/car.svg";
import React from "react";
import logoutIcon from "../icons/account_logout_.svg";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../reducers/userReducer";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData); // Assuming user data is in state.user.userData

  // define a handler function for home button
  const handleLogout = async () => {
    try {
      await dispatch(logoutAction()).unwrap(); // Use the logoutAction thunk
      navigate("/"); // Redirect to the home page after successful logout
    } catch (error) {
      // Handle the error in case the logout fails
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="header">
      <img src={HeaderIcon} alt="MainIcon" className="header__icon" />
      <nav className="navbar">
        {user ? (
          // Logged-in user view
          <>
            <NavLink
              to="/my-cars"
              className="navbar__item"
              activeclassname="active">
              <img src={carIcon} alt="My Cars Icon" />
              My Cars
            </NavLink>
            <NavLink
              to="/my-profile"
              className="navbar__item"
              activeclassname="active">
              <img src={profileIcon} alt="My Profile Icon" />
              My Profile
            </NavLink>
            <div className="navbar__item" onClick={handleLogout}>
              <img src={logoutIcon} alt="Log Out Icon" />
              Log Out
            </div>
          </>
        ) : (
          // Non-logged-in user view
          <>
            <NavLink to="/" className="navbar__item" activeclassname="active">
              <img src={homeIcon} alt="Home Icon" />
              Home
            </NavLink>
            <NavLink
              to="/subscription"
              className="navbar__item"
              activeclassname="active">
              <img src={profileIcon} alt="Subscription Icon" />
              Subscription
            </NavLink>
            <NavLink
              to="/login"
              className="navbar__item"
              activeclassname="active">
              <img src={loginIcon} alt="Login Icon" />
              Login
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
};

export default Header;
