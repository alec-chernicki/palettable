import axios from 'axios'
import { removeDuplicatesFrom } from '../utils/helpers'
import {
  CONTINUE_ONBOARDING, TOGGLE_COLOR_ANIMATION,
  CHANGE_COLOR_TEXT, EDIT_COLOR_TEXT, RESET_COLOR_NAME, TOGGLE_COLOR_PICKER,
  ADD_COLOR, REMOVE_COLOR, CHANGE_COLOR,
  REQUEST_PALETTE, RECEIVE_PALETTE, INVALIDATE_PALETTE
} from './constants/ActionTypes'

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

export function toggleColorPicker(color) {
  return {
    type: TOGGLE_COLOR_PICKER,
    id: color.id
  }
}

// TODO: Fix these weird names
export function changeColorText(color, text) {
  return {
    type: CHANGE_COLOR_TEXT,
    id: color.id,
    text
  }
}

export function editColorText(color, text) {
  return {
    type: EDIT_COLOR_TEXT,
    id: color.id,
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

export function invalidatePalette() {
  return {
    type: INVALIDATE_PALETTE
  }
}

function fetchPalette(colors) {
  return dispatch => {
    dispatch(requestPalette(colors))
    const apiURL = colors.length === 0 ? '/api/random' : '/api/change'
    const requestColors = colors.map(color => color.color)
    return axios
      .get(apiURL, {
        params: {
          colors: requestColors
        }
      })
      .then(({ data }) => dispatch(receivePalette(data)))
  }
}

function shouldFetchPalette(state) {
  const { colors, isFetching, didInvalidate } = state.fetchedPalette
  if (colors.length === 0) {
    return true
  } else if (isFetching) {
    return false
  } else {
    return didInvalidate
  }
}

export function fetchColorFromPaletteIfNeeded(colors) {
  return (dispatch, getState) => {
    const state = getState()
    const getFetchedPalette = () => getState().fetchedPalette.colors

    if (shouldFetchPalette(state)) {
      return dispatch(
        fetchPalette(colors)
      ).then(() => {
        const color = removeDuplicatesFrom(colors, getFetchedPalette())
        return Promise.resolve(color)
      })
    }
    else {
      const color = removeDuplicatesFrom(colors, getFetchedPalette())
      return Promise.resolve(color)
    }
  }
}

export function continueOnboardingIfNeeded() {
  return (dispatch, getState) => {
    const { onboardingStep } = getState()
    // FIXME: This checking logic is scattered around and gross
    if (onboardingStep <= 3 && onboardingStep >= 0) {
      dispatch(continueOnboarding())
    }
  }
}

export function addColorIfValid () {
  return (dispatch, getState) => {
    const { colors, onboardingStep } = getState()

    if ((onboardingStep <= 1 || onboardingStep > 3) && colors.length < 5) {
      return dispatch(
        fetchColorFromPaletteIfNeeded(colors)
      ).then(color => {
        dispatch(addColor(color))
      }).then(() => {
        dispatch(continueOnboardingIfNeeded())
      })
    }
  }
}

export function changeColorIfValid () {
  return (dispatch, getState) => {
    const { colors, onboardingStep } = getState()

    if (onboardingStep === 2 || onboardingStep > 3) {
      dispatch(invalidatePalette())

      return dispatch(
        fetchColorFromPaletteIfNeeded(colors)
      ).then(color => {
        dispatch(changeColor(color))
      }).then(() => {
        dispatch(continueOnboardingIfNeeded())
      })
    }
  }
}

export function removeColorIfValid () {
  return (dispatch, getState) => {
    const { colors, onboardingStep } = getState()

    if (colors.length > 1 && onboardingStep >= 3) {
      dispatch(invalidatePalette())
      dispatch(removeColor(...colors.slice(-1)))
      dispatch(continueOnboardingIfNeeded())
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
