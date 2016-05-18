import { combineReducers } from 'redux'
import {
  CONTINUE_ONBOARDING, TOGGLE_COLOR_ANIMATION,
  CHANGE_COLOR_TEXT, EDIT_COLOR_TEXT, RESET_COLOR_NAME, TOGGLE_COLOR_PICKER,
  ADD_COLOR, REMOVE_COLOR, CHANGE_COLOR,
  REQUEST_PALETTE, RECEIVE_PALETTE, INVALIDATE_PALETTE
} from './actions'

function onboardingStep(state = 0, action) {
  switch(action.type) {
    case CONTINUE_ONBOARDING:
      return state + 1
    default:
      return state
  }
}

// FIXME: rename to something that's not semantic to the state tree naming
function color(state = {
  id: 0,
  color: '',
  editedColor: '',
  animating: false
}, action) {
  switch (action.type) {
    case ADD_COLOR:
      return {
        id: state.reduce((maxId, color) => Math.max(color.id, maxId), -1) + 1,
        color: action.color
      }
    case CHANGE_COLOR:
      return {
        id: state.reduce((maxId, color) => Math.max(color.id, maxId), -1) + 1,
        color: action.color
      }
    // TODO: These action names feel weird, mrefactor into seperate reducer and combine
    case EDIT_COLOR_TEXT:
      if (state.id !== action.color.id) {
        return state
      }
      return {
        ...state,
        editedColor: action.text
      }
    case CHANGE_COLOR_TEXT:
      if (state.id !== action.color.id) {
        return state
      }
      return {
        ...state,
        color: action.text,
        editedColor: ''
      }
    case RESET_COLOR_NAME:
      return {
        ...state,
        editedColor: ''
      }
    case TOGGLE_COLOR_PICKER:
      // TODO: this shouldnt be color.id it should just be id
      if (state.id !== action.color.id) {
        return state
      }

      return {
        ...state,
        pickerActive: !state.pickerActive
      }
    case TOGGLE_COLOR_ANIMATION:
      if (state.id !== action.color.id) {
        return state
      }
      return {
        ...state,
        animating: !state.animating
      }

    default:
      return state
  }

}

function shownColors(state = [], action) {
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

function fetchedPalette(state = {
  isFetching: false,
  didInvalidate: false,
  fetchedPalette: []
}, action) {
  switch (action.type) {
    case REQUEST_PALETTE:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_PALETTE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        fetchedPalette: action.colors.map(color => '#' + color)
      }
    case INVALIDATE_PALETTE:
      return {
        ...state,
        didInvalidate: true
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  shownColors,
  onboardingStep,
  fetchedPalette
})

export default rootReducer
