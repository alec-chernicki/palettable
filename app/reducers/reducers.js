import { combineReducers } from 'redux';
import { onboarding } from './onboarding';
import { fetchedPalette } from './fetchedPalette';
import { shownPalette } from './shownPalette';

const rootReducer = combineReducers({
  onboarding,
  shownPalette,
  fetchedPalette,
});

export default rootReducer;
