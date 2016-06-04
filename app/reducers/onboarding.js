import { CONTINUE_ONBOARDING, COMPLETE_ONBOARDING } from '../constants/ActionTypes';

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
    default:
      return state;
  }
}
