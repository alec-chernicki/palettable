import axios from 'axios'
import { removeDuplicatesFrom } from './utils/helpers'

export const CONTINUE_ONBOARDING = 'CONTINUE_ONBOARDING'

export const ADD_COLOR = 'ADD_COLOR'
export const CHANGE_COLOR = 'CHANGE_COLOR'
export const REMOVE_COLOR = 'REMOVE_COLOR'

export const CHANGE_COLOR_TEXT = 'CHANGE_COLOR_TEXT'
export const EDIT_COLOR_TEXT = 'EDIT_COLOR_TEXT'
export const RESET_COLOR_NAME = 'RESET_COLOR_NAME'

export const TOGGLE_COLOR_ANIMATION = 'TOGGLE_COLOR_ANIMATION'

export const REQUEST_PALETTE = 'REQUEST_PALETTE'
export const RECEIVE_PALETTE = 'RECEIVE_PALETTE'
export const INVALIDATE_PALETTE = 'INVALIDATE_PALETTE'

export function continueOnboarding () {
  return {
    type: CONTINUE_ONBOARDING
  }
}

export function removeColor(color) {
  return {
    type: REMOVE_COLOR,
    id: color.id
  }
}

export function addColor(color) {
  return {
    type: ADD_COLOR,
    color
  }
}

export function changeColor(color) {
  return {
    type: CHANGE_COLOR,
    color
  }
}

// TODO: Fix these weird names
export function changeColorText(color, text) {
  return {
    type: CHANGE_COLOR_TEXT,
    color,
    text
  }
}

export function editColorText(color, text) {
  return {
    type: EDIT_COLOR_TEXT,
    color,
    text
  }
}

export function resetColorName(color) {
  return {
    type: RESET_COLOR_NAME,
    color
  }
}

export function toggleColorAnimation(color) {
  return {
    type: TOGGLE_COLOR_ANIMATION,
    color
  }
}

function requestPalette(currentColors) {
  return {
    type: REQUEST_PALETTE,
    currentColors
  }
}

function receivePalette(palette) {
  // FIXME: whats with this naming?
  return {
    type: RECEIVE_PALETTE,
    colors: palette
  }
}

export function invalidatePalette(palette) {
  return {
    type: INVALIDATE_PALETTE
  }
}

function fetchPalette(shownColors) {
  return dispatch => {
    dispatch(requestPalette(shownColors))
    const apiURL = shownColors.length <= 1 ? '/api/random' : '/api/change'

    return axios
      .get(apiURL, {
        params: {
          colors: shownColors
        }
      })
      .then(({ data }) => dispatch(receivePalette(data)))
      // TODO: Add an error state / catch here
  }
}

function shouldFetchPalette(state) {
  // FIXME: State tree feels weird here with double fetchedPalette
  const { fetchedPalette, isFetching, didInvalidate } = state.fetchedPalette
  if (fetchedPalette.length === 0) {
    return true
  } else if (isFetching) {
    return false
  } else {
    return didInvalidate
  }
}

export function fetchColorFromPaletteIfNeeded(shownColors) {
  return (dispatch, getState) => {
    const state = getState()
    // FIXME: State tree feels weird here with double fetchedPalette
    const getFetchedPalette = () => getState().fetchedPalette.fetchedPalette

    if (shouldFetchPalette(state)) {
      return dispatch(
        fetchPalette(shownColors)
      ).then(() => {
        const color = removeDuplicatesFrom(shownColors, getFetchedPalette())
        return Promise.resolve(color)
      })
    }
    else {
      const color = removeDuplicatesFrom(shownColors, getFetchedPalette())
      return Promise.resolve(color)
    }
  }
}

export function animateColorStatus(color) {
  let animationTimeout
  clearTimeout(animationTimeout)
  return dispatch => {
    dispatch(toggleColorAnimation(color))

    animationTimeout = setTimeout(() => {
      dispatch(toggleColorAnimation(color))
    }, 1000)
  }
}
