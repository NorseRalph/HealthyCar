import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addCar } from "../reducers/carSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const CarRegistrationForm = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData)
  const userId = localStorage.getItem("userId"); 
  const navigate = useNavigate();

  console.log(userId);


  // Form validation schema using Yup
  const carSchema = Yup.object({
    ownerId: "",
    make: Yup.string().required("make is required"),
    model: Yup.string().required("Model is required"),
    year: Yup.number()
      .required("Year is required")
      .min(1900)
      .max(new Date().getFullYear()),
    name: Yup.string().required("Display name is required"),
    vin: Yup.string()
      .matches(
        /^[0-9A-Z]+$/,
        "VIN must consist of numbers and uppercase letters only"
      )
      .length(17, "VIN must be exactly 17 characters")
      .required("VIN is required"),
  });

  // useFormik hook
  // useFormik hook
  const formik = useFormik({
    initialValues: {
      ownerId: userId,
      make: "",
      model: "",
      year: 0,
      name: "",
      vin: "",
    },
    validationSchema: carSchema,
    onSubmit: (values) => {
      console.log(values); // Add this line to debug
      dispatch(addCar(values));
      // Additional logic after submission
      navigate("/my-cars");
  }
  });

  return (
    <div className="car-registration">
      <h1 className="car-registration__header">Add Car</h1>
      <form className="car-registration__form" onSubmit={formik.handleSubmit}>
      <input
        type="hidden"
        name="ownerId"
        value={userId}
      />
        <input
          type="text"
          className="car-registration__input"
          name="make"
          placeholder="make"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.make}
        />
        {formik.touched.make && formik.errors.make && (
          <div className="error">{formik.errors.make}</div>
        )}
        <input
          type="text"
          className="car-registration__input"
          name="model"
          placeholder="Model"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.model}
        />
        {formik.touched.model && formik.errors.model && (
          <div className="error">{formik.errors.model}</div>
        )}
        <input
          type="text"
          className="car-registration__input"
          name="year"
          placeholder="Year"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.year}
        />
        {formik.touched.year && formik.errors.year && (
          <div className="error">{formik.errors.year}</div>
        )}
        <input
          type="text"
          className="car-registration__input"
          name="name"
          placeholder="Display Name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="error">{formik.errors.name}</div>
        )}
        <input
          type="text"
          className="car-registration__input"
          name="vin"
          placeholder="VIN"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.vin}
        />
        {formik.touched.vin && formik.errors.vin && (
          <div className="error">{formik.errors.vin}</div>
        )}
        <button className="car-registration__button" type="submit">
          Register Car
        </button>
      </form>
    </div>
  );
};

export default CarRegistrationForm;
