import React from "react";

const SubscriptionCard = ({ title, description, price }) => {
  return (
    <div className="subscription-card">
      <h1 className="subscription-card__title">{title}</h1>
      <p className="subscription-card__description">{description}</p>
      <div className="subscription-card__price">{price}</div>
      <button className="subscription-card__button">BUY</button>
    </div>
  );
};

const Subscription = () => {
  return (
    <div className="subscription">
      <SubscriptionCard
        title="Regular Owner Subscription"
        description="Store the data of one or two cars"
        price="7.99$"
      />
      <SubscriptionCard
        title="Fleet Owner Subscription"
        description="Store the data of 3 or more cars"
        price="10.99$"
      />
    </div>
  );
};

export default Subscription;
