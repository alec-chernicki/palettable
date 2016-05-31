import {
  ADD_COLOR, CHANGE_COLOR, EDIT_COLOR_TEXT,
  CHANGE_COLOR_TEXT, RESET_COLOR_NAME, TOGGLE_COLOR_PICKER,
  TOGGLE_COLOR_ANIMATION, CLOSE_ALL_COLOR_PICKERS,
} from '../constants/ActionTypes';

const initialState = {
  id: 0,
  color: '',
  editedColor: '',
  pickerActive: false,
  animating: false,
};

export function color(state = initialState, action) {
  switch (action.type) {
    case ADD_COLOR:
      return {
        id: state.reduce((maxId, colorItem) => Math.max(colorItem.id, maxId), -1) + 1,
        color: action.color,
      };
    case CHANGE_COLOR:
      return {
        id: state.reduce((maxId, colorItem) => Math.max(colorItem.id, maxId), -1) + 1,
        color: action.color,
      };
      // TODO: These action names feel weird, refactor into seperate reducer and combine
    case EDIT_COLOR_TEXT:
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        editedColor: action.text,
      };
    case CHANGE_COLOR_TEXT:
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        color: action.text,
        editedColor: '',
      };
    case RESET_COLOR_NAME:
      return {
        ...state,
        editedColor: '',
      };
    case TOGGLE_COLOR_PICKER:
      if (state.id !== action.id) {
        return {
          ...state,
          pickerActive: false,
        };
      }
      return {
        ...state,
        pickerActive: !state.pickerActive,
      };
    case CLOSE_ALL_COLOR_PICKERS:
      return {
        ...state,
        pickerActive: false,
      };
    case TOGGLE_COLOR_ANIMATION:
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        animating: !state.animating,
      };
    default:
      return state;
  }
}
