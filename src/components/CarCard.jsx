import React from "react";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  return (
    <div className="car-card">
      <Link to={`/user-car-chart/${car.id}`} className="car-card__name">
        {car.name}
      </Link>
      <div className="car-card__details">
        <p className="car-card__detail car-card__detail--make">
          Make: {car.make}
        </p>
        <p className="car-card__detail car-card__detail--model">
          Model: {car.model}
        </p>
        <p className="car-card__detail car-card__detail--year">
          Year: {car.year}
        </p>
        <p className="car-card__detail car-card__detail--vin">VIN: {car.vin}</p>
      </div>
    </div>
  );
};

export default CarCard;
