// MyCars.js
import React from "react";
import { useNavigate } from "react-router-dom";
import AddNewCarCard from "../components/AddNewCarCard.jsx"; // make sure this path is correct

const MyCars = () => {
  const navigate = useNavigate();

  const handleAddNewCarClick = () => {
    navigate("/add-car"); // Navigate to the Add Car form when the card is clicked
  };

  return (
    <div className="MyCars">
      <AddNewCarCard onClick={handleAddNewCarClick} />
    </div>
  );
};

export default MyCars;
