import React, { useState } from "react";
import { useDispatch } from "react-redux"; // Make sure to import useDispatch
import { userLogin } from "../reducers/userReducer"; // Updated import
import { Link, useNavigate } from "react-router-dom"; // import the Link and useNavigate components from react-router-dom
import "../sass/main.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); // use the useNavigate hook to get the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const actionResult = await dispatch(userLogin({ username, password }));
      const userData = actionResult.payload;
      localStorage.setItem("userInfo", JSON.stringify(userData));
      navigate("/my-cars"); // Redirect to My Cars after login
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  return (
    <div className="login">
      <h1 className="login__title">Log In</h1>
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__field">
          <input
            type="text"
            className="login__input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="login__field">
          <input
            type="password"
            className="login__input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login__action">
          <button type="submit" className="login__button">
            Log In
          </button>
        </div>
      </form>
      <footer className="login__footer">
        {" "}
        {/* add a footer element with a className */}
        <p>
          If you don't have an account please{" "}
          <Link to="/register">register</Link> here.
        </p>{" "}
        {/* add the text and the Link component */}
      </footer>
    </div>
  );
};

export default Login;
