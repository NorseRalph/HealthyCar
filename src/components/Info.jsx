import React from "react";
import backgroundImage from "../icons/backgroundImage.png"; // Ensure this is the correct path

const Info = () => {
  return (
    <section className="info">
      <div className="info__header">
        <img
          src={backgroundImage}
          alt="Background"
          className="info__background-image"
        />
        <h1 className="info__title">What we offer</h1>
      </div>
      <div className="info__content">
        <h2 className="info__intro">
          Welcome to HealthyCar, the ultimate solution for efficient and
          comprehensive car management. Whether you're an individual car owner
          or a fleet manager with multiple vehicles, our platform is designed to
          empower you with powerful tools and insights.
        </h2>

        {/* Cars Management Section */}
        <section className="info__section info__section--management">
          <h2 className="info__section-title">Cars management made easy</h2>
          <ul className="info__list">
            <li className="info__list-item">
              Add and manage your cars in one centralized platform.
            </li>
            <li className="info__list-item">
              Access a user-friendly dashboard for a quick overview.
            </li>
          </ul>
        </section>

        {/* Data-Driven Insights Section */}
        <section className="info__section info__section--insights">
          <h2 className="info__section-title">Data-Driven Insights</h2>
          <ul className="info__list">
            <li className="info__list-item">
              Access detailed historical data and generate insightful reports.
            </li>
            <li className="info__list-item">
              Make informed decisions based on performance metrics and trends.
            </li>
            <li className="info__list-item">
              Analyse fuel consumption, maintenance costs, and more.
            </li>
          </ul>
        </section>

        {/* Maintenance Planning Section */}
        <section className="info__section info__section--planning">
          <h2 className="info__section-title">
            Maintenance Planning and Tracking
          </h2>
          <ul className="info__list">
            <li className="info__list-item">
              Schedule and track maintenance tasks for optimal vehicle health.
            </li>
            <li className="info__list-item">
              Receive reminders for upcoming service needs and inspections.
            </li>
            <li className="info__list-item">
              Keep your fleet in top-notch condition, reducing downtime and
              costs.
            </li>
          </ul>
        </section>

        {/* Why Choose HealthyCar Section */}
        <section className="info__section info__section--choose">
          <h2 className="info__section-title">Why Choose HealthyCar?</h2>
          <ul className="info__list">
            <li className="info__list-item">
              User-Friendly Interface: Our intuitive interface makes car and
              fleet management a breeze.
            </li>
            <li className="info__list-item">
              Customizable Solutions: Tailor the platform to your specific
              needs, whether you're a single car owner or managing a large
              fleet.
            </li>
            <li className="info__list-item">
              Comprehensive Insights: Unlock the full potential of your vehicles
              with detailed analytics and reports.
            </li>
            <li className="info__list-item">
              Reliable Support: Our dedicated support team is ready to assist
              you every step of the way.
            </li>
            <li className="info__list-item">
              Secure and Reliable: Rest easy knowing that your data is secure
              and our platform is reliable.
            </li>
          </ul>
        </section>

        {/* Call to Action */}
        <div className="info__cta">
          <h2 className="info__cta-text">
            Ready to take control of your cars? Join now and experience the
            future of automotive management with{" "}
            <strong className="info__cta-highlight">HealthyCar.</strong>
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Info;
