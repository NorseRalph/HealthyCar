import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import '../sass/main.scss';
import { loginUserAction } from '../reducers/userReducer';


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData, loading, error } = useSelector(state => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUserAction())
      .unwrap()
      .then(() => {
        console.log("Logged in successfully with user ID:", userData.userId);
        navigate("/"); // Navigate to home page after login
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  return (
    <div className="login">
      <h1 className="login__title">Log In</h1>
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__field">
          <input type="text" className="login__input" placeholder="Username" />
        </div>
        <div className="login__field">
          <input
            type="password"
            className="login__input"
            placeholder="Password"
          />
        </div>
        <div className="login__action">
          <button type="submit" className="login__button">
            Log In
          </button>
        </div>
      </form>
      <footer className="login__footer">
        <p>
          If you don't have an account, please{" "}
          <Link to="/register">register</Link> here.
        </p>
      </footer>
    </div>
  );
};

export default Login;
