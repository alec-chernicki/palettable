import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import InterfaceTheme from '../InterfaceTheme';

const Onboarding = ({ colors, onboardingStep }) => {
  const { color } = colors[colors.length - 1];
  const onboardingCompleted = onboardingStep > 3;

  return (
    <div>
      {!onboardingCompleted &&
        <InterfaceTheme color={color}>
          <div className="cover onboarding" />
          <ReactCSSTransitionGroup
            className="onboarding-container"
            transitionName={"onboarding-animation"}
            transitionEnterTimeout={150}
            transitionLeaveTimeout={150}
          >
            {onboardingStep === 1 && <StepOne />}
            {onboardingStep === 2 && <StepTwo />}
            {onboardingStep === 3 && <StepThree />}
          </ReactCSSTransitionGroup>
        </InterfaceTheme>}
    </div>
  );
};

Onboarding.propTypes = {
  onboardingStep: PropTypes.number.isRequired,
  colors: PropTypes.array.isRequired,
};

export default Onboarding;
