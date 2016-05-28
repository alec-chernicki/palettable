import { colors } from './colors';
import {
  ADD_COLOR, CHANGE_COLOR, REMOVE_COLOR, DISLIKE_COLOR,
  CHANGE_COLOR_TEXT, EDIT_COLOR_TEXT, RESET_COLOR_NAME,
  TOGGLE_COLOR_PICKER, TOGGLE_COLOR_ANIMATION,
} from '../constants/ActionTypes';

// FIXME: This feels super weird
const initialState = {
  colors: [],
  dislikedColors: [],
};

export function shownPalette(state = initialState, action) {
  switch (action.type) {
    case ADD_COLOR:
    case CHANGE_COLOR_TEXT:
    case EDIT_COLOR_TEXT:
    case RESET_COLOR_NAME:
    case TOGGLE_COLOR_PICKER:
    case TOGGLE_COLOR_ANIMATION:
    case CHANGE_COLOR:
      return {
        ...state,
        colors: colors(state.colors, action),
      };
    case REMOVE_COLOR:
      return {
        ...state,
        colors: colors(state.colors, action),
        dislikedColors: [],
      };
    case DISLIKE_COLOR:
      return {
        ...state,
        colors: colors(state.colors, action),
        dislikedColors: [...state.dislikedColors, action.color],
      };
    default:
      return state;
  }
}
