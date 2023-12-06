import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resetPasswordAction } from "../reducers/userReducer";
import Popup from "./Popup";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [popup, setPopup] = useState({ show: false, message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Here you would dispatch your resetPasswordAction and wait for the promise to resolve
      await dispatch(resetPasswordAction(email)).unwrap();
      setPopup({ show: true, message: "Successfully sent email." });
    } catch (error) {
      setPopup({ show: true, message: "This email doesn't exist." });
    }
  };

  useEffect(() => {
    let timer;
    // Set the timer if the popup is shown
    if (popup.show) {
      timer = setTimeout(() => {
        setPopup({ ...popup, show: false });
      }, 4000); // Hide the popup after 4 seconds
    }

    // Clear the timer when the component unmounts or before setting a new timer
    return () => clearTimeout(timer);
  }, [popup.show]);

  return (
    <div className="ForgetPassword">
      <h2 className="ForgetPassword__title">Forgot the password?</h2>
      <form className="ForgetPassword__form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="ForgetPassword__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update the email state on input change
        />
        <button type="submit" className="ForgetPassword__button">
          Submit
        </button>
      </form>
      {popup.show && <Popup message={popup.message} />}
    </div>
  );
};

export default ForgetPassword;
