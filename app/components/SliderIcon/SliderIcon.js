import './SliderIcon.scss';

import React, { PropTypes } from 'react';

// TODO: Clean up with classnames module
const SliderIcon = ({ onToggle, toggled }) => (
  <div className={toggled && 'active'}>
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
  </div>
);

SliderIcon.propTypes = {
  onToggle: PropTypes.func.isRequired,
};

export default SliderIcon;
