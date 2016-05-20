import { color } from './color'

import {
  ADD_COLOR, CHANGE_COLOR, REMOVE_COLOR,
  CHANGE_COLOR_TEXT, EDIT_COLOR_TEXT, RESET_COLOR_NAME,
  TOGGLE_COLOR_PICKER, TOGGLE_COLOR_ANIMATION
} from '../constants/ActionTypes'

const initialState = []

export function colors(state = initialState, action) {
  switch (action.type) {
    // FIXME: refactor into combine reducers
    case ADD_COLOR:
      return [
        ...state,
        color(state, action)
      ]
    case CHANGE_COLOR:
      return [
        ...state.slice(0, -1),
        color(state, action)
      ]

    case REMOVE_COLOR:
      return state.filter(color =>
        color.id !== action.id
      )
    case CHANGE_COLOR_TEXT:
    case EDIT_COLOR_TEXT:
    case RESET_COLOR_NAME:
    case TOGGLE_COLOR_ANIMATION:
    case TOGGLE_COLOR_PICKER:
      return state.map(c =>
        color(c, action)
      )
    default:
      return state
  }
}
