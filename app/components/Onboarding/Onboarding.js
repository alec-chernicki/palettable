import React, { PropTypes } from 'react'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import InterfaceTheme from '../InterfaceTheme'

const Onboarding = ({shownColors, onboardingStep}) => {
  // Logic in reducer?

  const steps = [<StepOne/>, <StepTwo/>, <StepThree/>];
  const step = steps[onboardingStep] || false;
  const color = shownColors[shownColors.length - 1].color

  return (
    <InterfaceTheme color={color}>
      <div className='onboarding-container'>
        { step }
      </div>
    </InterfaceTheme>
  )
}

Onboarding.propTypes = {
  onboardingStep: PropTypes.number.isRequired,
  shownColors: PropTypes.array.isRequired
}

export default Onboarding
