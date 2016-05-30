import './SliderIcon.scss';

import React, { PropTypes } from 'react';

const SliderIcon = ({ onToggle }) => (
  <div className="color-picker-icon" onClick={onToggle}>
    <div className="line-container">
      <div className="line" />
      <div className="circle" />
    </div>
    <div className="line-container">
      <div className="line" />
      <div className="circle" />
    </div>
    <div className="line-container">
      <div className="line" />
      <div className="circle" />
    </div>
  </div>
);

SliderIcon.propTypes = {
  onToggle: PropTypes.func.isRequired,
};

export default SliderIcon;
