import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import InterfaceTheme from '../InterfaceTheme';

const Onboarding = ({colors, onboardingStep}) => {
  // Logic in reducer?

  const steps = [<StepOne/>, <StepTwo/>, <StepThree/>];
  const step = steps[onboardingStep] || false;
  const color = colors[colors.length - 1].color
  const onboardingCompleted = onboardingStep > 2;

  return (
    <div>
      { !onboardingCompleted && <InterfaceTheme color={color}>
        <div className="cover onboarding" />
        <ReactCSSTransitionGroup
          className='onboarding-container'
          transitionName={ 'onboarding-animation' }
          transitionEnterTimeout={300}
          transitionLeaveTimeout={350} >
          {onboardingStep === 0 && <StepOne/>}
          {onboardingStep === 1 && <StepTwo/>}
          {onboardingStep === 2 && <StepThree/>}
        </ReactCSSTransitionGroup>
      </InterfaceTheme> }
    </div>
  )
}

Onboarding.propTypes = {
  onboardingStep: PropTypes.number.isRequired,
  colors: PropTypes.array.isRequired
}

export default Onboarding
