// CarRegistrationForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCarAction } from "../actions/carActions.js"; // Replace with your actual action

const CarRegistrationForm = () => {
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [vin, setVin] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch an action to add the car to the store or send it to the backend
    dispatch(addCarAction({ manufacturer, model, year, displayName, vin }));
    // Additional logic to handle after form submission, like clearing the form or showing a success message
  };

  return (
    <div className="car-registration">
      <h1 className="car-registration__header">Add Car</h1>
      <form className="car-registration__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="car-registration__input"
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
          placeholder="Manufacturer"
        />
        <input
          type="text"
          className="car-registration__input"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Model"
        />
        <input
          type="text"
          className="car-registration__input"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Year"
        />
        <input
          type="text"
          className="car-registration__input"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Display Name"
        />
        <input
          type="text"
          className="car-registration__input"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
          placeholder="VIN"
        />
        <button className="car-registration__button" type="submit">Create</button>
      </form>
    </div>
  );
};

export default CarRegistrationForm;
