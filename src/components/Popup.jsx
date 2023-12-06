import React from "react";
import PropTypes from "prop-types";
import "../sass/main.scss";

const Popup = ({ message }) => {
  return <div className="Popup">{message}</div>;
};

Popup.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Popup;
