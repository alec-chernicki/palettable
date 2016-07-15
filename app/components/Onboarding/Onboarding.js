import './Onboarding.scss';

import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import InterfaceTheme from '../InterfaceTheme/InterfaceTheme';

const Onboarding = ({ color, isCompleted, step }) => (
  <div>
    {!isCompleted &&
      <InterfaceTheme color={color}>
        <div className="cover onboarding" />
        <ReactCSSTransitionGroup
          className="onboarding-container"
          transitionName={"onboarding-animation"}
          transitionEnterTimeout={150}
          transitionLeaveTimeout={150}
        >
          {step === 1 && <StepOne />}
          {step === 2 && <StepTwo />}
          {step === 3 && <StepThree />}
          {step === 4 && <StepFour />}
        </ReactCSSTransitionGroup>
      </InterfaceTheme>}
  </div>
);

Onboarding.propTypes = {
  step: PropTypes.number.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
};

export default Onboarding;
