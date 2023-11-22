import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../reducers/userReducer"; // Import the register async thunk
import registerPhoto from "../icons/registerPhoto.png";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook to navigate to other routes

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
    } else {
      // Dispatch the register async thunk action
      try {
        await dispatch(register({ username, email, password })).unwrap();
        // Redirect the user to the home page after a successful registration
        navigate("/"); // Navigate to the desired path
      } catch (error) {
        alert(error.message); // Handle any errors here
      }
    }
  };

  return (
    <div className="register">
      <div className="register__photo-wrapper">
        <img src={registerPhoto} alt="Register" className="register__photo" />
      </div>
      <form className="register__form" onSubmit={handleSubmit}>
        <h1 className="register__title">Join us</h1>
        <input
          type="text"
          className="register__input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          className="register__input"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="register__input"
          placeholder="Password"
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="register__input"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" className="register__button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
