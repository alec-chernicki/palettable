import { combineReducers } from 'redux';
import { onboardingStep } from './onboardingStep';
import { fetchedPalette } from './fetchedPalette';
import { shownPalette } from './shownPalette';

const rootReducer = combineReducers({
  onboardingStep,
  shownPalette,
  fetchedPalette,
});

export default rootReducer;
