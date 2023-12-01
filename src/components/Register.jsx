import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../reducers/userReducer"; // Import the register async thunk
import registerPhoto from "../icons/registerPhoto.png";
import * as Yup from "yup";
import { useFormik } from "formik";
import { registerUserAction} from "../reducers/userReducer"

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook to navigate to other routes

  // Form validation schema
  const formSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  // useFormik hook
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      if (values.password === values.confirmPassword) {
        try {
          await dispatch(
            registerUserAction({
              username: values.username,
              email: values.email,
              password: values.password,
            })
          ).unwrap();
          navigate("/");
        } catch (error) {
          alert(error.message);
        }
      } else {
        alert("Passwords don't match");
      }
    },
  });

  return (
    <div className="register">
      <div className="register__photo-wrapper">
        <img src={registerPhoto} alt="Register" className="register__photo" />
      </div>
      <form className="register__form" onSubmit={formik.handleSubmit}>
        <h1 className="register__title">Join us</h1>
        <input
          type="text"
          className="register__input"
          placeholder="Username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.username && formik.errors.username ? (
          <div className="error">{formik.errors.username}</div>
        ) : null}
        <input
          type="email"
          className="register__input"
          placeholder="Email address"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="error">{formik.errors.email}</div>
        ) : null}
        <input
          type="password"
          className="register__input"
          placeholder="Password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="error">{formik.errors.password}</div>
        ) : null}
        <input
          type="password"
          className="register__input"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="error">{formik.errors.confirmPassword}</div>
        ) : null}
        <button type="submit" className="register__button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

