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
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    dispatch(loginUserAction({ email, password }))
      .unwrap()
      .then(() => {
        console.log("Logged in successfully with user ID:", userData.userId);
        navigate('/'); // Navigate to home page after login
      })
      .catch((loginError) => {
        console.error('Login failed:', loginError);
      });
  };

  return (
    <div className="login">
      <h1 className="login__title">Log In</h1>
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__field">
          <input
            type="text"
            name="email"
            className="login__input"
            placeholder="Email"
            required // Ensuring the input is not empty
          />
        </div>
        <div className="login__field">
          <input
            type="password"
            name="password"
            className="login__input"
            placeholder="Password"
            required // Ensuring the input is not empty
          />
        </div>
        <div className="login__action">
          <button type="submit" className="login__button">
            Log In
          </button>
        </div>
        {error && <p className="login__error">{error}</p>}
      </form>
      <footer className="login__footer">
        <p>
          If you don't have an account, please <Link to="/register">register</Link> here.
        </p>
      </footer>
    </div>
  );
};

export default Login;
