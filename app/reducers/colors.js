import { color } from './color';
import {
  ADD_COLOR, CHANGE_COLOR, REMOVE_COLOR, RESTART_ONBOARDING,
  CHANGE_COLOR_TEXT, EDIT_COLOR_TEXT, RESET_COLOR_NAME,
  TOGGLE_COLOR_PICKER, TOGGLE_COLOR_ANIMATION, CLOSE_ALL_COLOR_PICKERS,
} from '../constants/ActionTypes';

const initialState = [];

export function colors(state = initialState, action) {
  switch (action.type) {
    case ADD_COLOR:
      return [
        ...state,
        color(state, action),
      ];
    case CHANGE_COLOR:
      return [
        ...state.slice(0, -1),
        color(state, action),
      ];

    case REMOVE_COLOR:
      return state.filter(colorItem =>
        colorItem.id !== action.id
      );
    case RESTART_ONBOARDING:
      return [
        ...state.slice(0, 1),
      ];
    // TODO: This is getting a bit ugly consider redux-actions to tidy up
    case CHANGE_COLOR_TEXT:
    case EDIT_COLOR_TEXT:
    case RESET_COLOR_NAME:
    case TOGGLE_COLOR_PICKER:
    case CLOSE_ALL_COLOR_PICKERS:
      return state.map(c =>
        color(c, action)
      );
    default:
      return state;
  }
}
