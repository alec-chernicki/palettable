// Props that need passing
// addEnabled: true,
// changeEnabled: false,
// removeEnabled: false

import { combineReducers } from 'redux'
import {
  CONTINUE_ONBOARDING, TOGGLE_COLOR_ANIMATION,
  ADD_COLOR, REMOVE_COLOR, CHANGE_COLOR, COPY_COLOR,
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
function color(state, action) {
  switch (action.type) {
    case ADD_COLOR:
      return {
        id: state.reduce((maxId, color) => Math.max(color.id, maxId), -1) + 1,
        color: action.color,
        statusText: 'Liked'
      }
    case CHANGE_COLOR:
      return {
        id: state.reduce((maxId, color) => Math.max(color.id, maxId), -1) + 1,
        color: action.color,
        statusText: 'Disliked'
      }
    case COPY_COLOR:
      return {
        ...state,
        statusText: 'Copied'
      }
    // FIXME: These arent included in initial default state
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
    case COPY_COLOR:
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
    case TOGGLE_COLOR_ANIMATION:
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
