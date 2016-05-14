import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import InterfaceTheme from '../InterfaceTheme';

const Onboarding = ({shownColors, onboardingStep}) => {
  // Logic in reducer?

  const steps = [<StepOne/>, <StepTwo/>, <StepThree/>];
  const step = steps[onboardingStep] || false;
  const color = shownColors[shownColors.length - 1].color

  return (
    <InterfaceTheme color={color}>
      <ReactCSSTransitionGroup
        className='onboarding-container'
        transitionName={ 'onboarding-animation' }
        transitionEnterTimeout={300}
        transitionLeaveTimeout={350} >
        {onboardingStep === 0 && <StepOne/>}
        {onboardingStep === 1 && <StepTwo/>}
        {onboardingStep === 2 && <StepThree/>}
      </ReactCSSTransitionGroup>
    </InterfaceTheme>
  )
}

Onboarding.propTypes = {
  onboardingStep: PropTypes.number.isRequired,
  shownColors: PropTypes.array.isRequired
}

export default Onboarding
