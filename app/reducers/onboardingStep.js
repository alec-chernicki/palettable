import { CONTINUE_ONBOARDING } from '../constants/ActionTypes';

const initialState = 0;

export function onboardingStep(state = initialState, action) {
  switch (action.type) {
    case CONTINUE_ONBOARDING:
      return state + 1;
    default:
      return state;
  }
}
