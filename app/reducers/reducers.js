import { combineReducers } from 'redux'
import { onboardingStep } from './onboardingStep'
import { fetchedPalette } from './fetchedPalette'
import { shownPalette } from './shownPalette'

import {colors} from './colors'

const rootReducer = combineReducers({
  onboardingStep,
  // shownPalette,
  shownPalette,
  fetchedPalette
})

export default rootReducer
