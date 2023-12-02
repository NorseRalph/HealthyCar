import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import registerPhoto from "../icons/registerPhoto.png";
import * as Yup from "yup";
import { useFormik } from "formik";
import { registerUserAction } from "../reducers/userReducer";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook to navigate to other routes
  const location = useLocation();
  const { isFleetOwner } = location.state || { isFleetOwner: "no" };

  // Form validation schema
  const formSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
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
      firstName: "",
      lastName: "",
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
              isFleetOwner: isFleetOwner === "yes",
            })
          ).unwrap();
          navigate("/welcomeBox");
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
          placeholder="First name"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="error">{formik.errors.firstName}</div>
        ) : null}
        <input
          type="text"
          className="register__input"
          placeholder="Last name"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="error">{formik.errors.lastName}</div>
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
