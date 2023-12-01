import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddNewCarCard from "../components/AddNewCarCard.jsx";
import CarCard from "./CarCard.jsx";
import { fetchUserCarsByOwnerId } from "../reducers/carSlice.js"; // Adjust the import path as necessary

const MyCars = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access the car-related state using the 'cars' slice from the Redux store
  const { cars, status, error } = useSelector((state) => state.cars);

  useEffect(() => {
    // Dispatch the 'fetchUserCarsByOwnerId' action when the component mounts
    dispatch(fetchUserCarsByOwnerId());
  }, [dispatch]);

  const handleAddNewCarClick = () => {
    // Navigate to the Add Car form when the button is clicked
    navigate("/add-car");
  };

  // Only render the CarCard components if cars is an array and the status is 'succeeded'
  return (
    <div className="MyCars">
      <AddNewCarCard onClick={handleAddNewCarClick} />
      {status === "loading" && <p>Loading cars...</p>}
      {error && <p>Error loading cars: {error}</p>}
      {status === "succeeded" &&
        Array.isArray(cars) &&
        cars.map((car) => <CarCard key={car.id} car={car} />)}
    </div>
  );
};

export default MyCars;
