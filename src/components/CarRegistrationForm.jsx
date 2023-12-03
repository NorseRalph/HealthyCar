import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addCarAction } from "../actions/carActions"; // Replace with your actual action

const CarRegistrationForm = () => {
  const dispatch = useDispatch();

  // Form validation schema using Yup
  const carSchema = Yup.object({
    manufacturer: Yup.string().required("Manufacturer is required"),
    model: Yup.string().required("Model is required"),
    year: Yup.number()
      .required("Year is required")
      .min(1900)
      .max(new Date().getFullYear()),
    displayName: Yup.string().required("Display name is required"),
    vin: Yup.string()
      .matches(
        /^[0-9A-Z]+$/,
        "VIN must consist of numbers and uppercase letters only"
      )
      .length(17, "VIN must be exactly 17 characters")
      .required("VIN is required"),
  });

  // useFormik hook
  const formik = useFormik({
    initialValues: {
      manufacturer: "",
      model: "",
      year: 0,
      displayName: "",
      vin: "",
    },
    validationSchema: carSchema,
    onSubmit: (values) => {
      dispatch(addCarAction(values));
      // Additional logic after submission, like redirecting
    },
  });

  return (
    <div className="car-registration">
      <h1 className="car-registration__header">Add Car</h1>
      <form className="car-registration__form" onSubmit={formik.handleSubmit}>
        <input
          type="text"
          className="car-registration__input"
          name="manufacturer"
          placeholder="Manufacturer"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.manufacturer}
        />
        {formik.touched.manufacturer && formik.errors.manufacturer && (
          <div className="error">{formik.errors.manufacturer}</div>
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
          name="displayName"
          placeholder="Display Name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.displayName}
        />
        {formik.touched.displayName && formik.errors.displayName && (
          <div className="error">{formik.errors.displayName}</div>
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
