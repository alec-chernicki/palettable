import { combineReducers } from 'redux'
import { onboardingStep } from './onboardingStep'
import { fetchedPalette } from './fetchedPalette'
import { colors } from './colors'

const rootReducer = combineReducers({
  colors,
  onboardingStep,
  fetchedPalette
})

export default rootReducer
