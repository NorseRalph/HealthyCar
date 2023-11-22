// AddNewCarCard.js
import React from "react";

const AddNewCarCard = ({ onClick }) => {
  return (
    <div className="add-new-car-card" onClick={onClick}>
      <span className="add-new-car-card__icon">+</span>
      <p className="add-new-car-card__text">Add new car</p>
    </div>
  );
};

export default AddNewCarCard;
