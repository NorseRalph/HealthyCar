import React from "react";
import { useNavigate } from "react-router-dom";

const SubscriptionCard = ({ title, description, price, onClick }) => {
  return (
    <div className="subscription-card">
      <h1 className="subscription-card__title">{title}</h1>
      <p className="subscription-card__description">{description}</p>
      <div className="subscription-card__price">{price}</div>
      <button className="subscription-card__button" onClick={onClick}>
        BUY
      </button>
    </div>
  );
};

const Subscription = () => {
  const navigate = useNavigate();
  const handleBuyClick = (isFleetOwner) => {
    console.log(`Is Fleet Owner: ${isFleetOwner}`);
    navigate("/register", {
      state: {isFleetOwner},
    });
  };

  return (
    <div className="subscription">
      <SubscriptionCard
        title="Regular Owner Subscription"
        description="Store the data of one or two cars"
        price="7.99$"
        onClick={() => handleBuyClick(false)}
      />
      <SubscriptionCard
        title="Fleet Owner Subscription"
        description="Store the data of 3 or more cars"
        price="10.99$"
        onClick={() => handleBuyClick(true)}
      />
    </div>
  );
};

export default Subscription;
