import React from "react";
import card0 from "../icons/card.png";
import card1 from "../icons/card.png";

const Cards = () => {
  return (
    <div className="cards-container">
      <div className="card">
        <img src={card0} alt="Card 1" className="card__image" />
      </div>
      <div className="card">
        <img src={card1} alt="Card 2" className="card__image" />
      </div>
    </div>
  );
};

export default Cards;
