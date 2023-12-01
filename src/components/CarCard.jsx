import React from "react";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  return (
    <Link to={`/user-car-chart/${car.id}`} className="car-card">
      <h3 className="car-card__name">{car.name}</h3>
      <span className="car-card__icon">+</span>
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
    </Link>
  );
};

export default CarCard;
