import {
  CONTINUE_ONBOARDING, COMPLETE_ONBOARDING, RESTART_ONBOARDING,
} from '../constants/ActionTypes';

const initialState = {
  step: 0,
  isCompleted: false,
};

export function onboarding(state = initialState, action) {
  switch (action.type) {
    case CONTINUE_ONBOARDING:
      return {
        ...state,
        step: state.step + 1,
      };
    case COMPLETE_ONBOARDING:
      return {
        ...state,
        isCompleted: true,
      };
    case RESTART_ONBOARDING:
      return {
        ...state,
        step: 1,
        isCompleted: false,
      };
    default:
      return state;
  }
}
