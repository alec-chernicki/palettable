import axios from 'axios';
import { removeDuplicatesFrom } from '../utils/helpers';
import {
  CONTINUE_ONBOARDING, TOGGLE_COLOR_ANIMATION, DISLIKE_COLOR,
  CHANGE_COLOR_TEXT, EDIT_COLOR_TEXT, RESET_COLOR_NAME, TOGGLE_COLOR_PICKER,
  ADD_COLOR, REMOVE_COLOR, CHANGE_COLOR,
  REQUEST_PALETTE, RECEIVE_PALETTE, INVALIDATE_PALETTE, CLOSE_ALL_COLOR_PICKERS,
} from './constants/ActionTypes';

export function continueOnboarding() {
  return {
    type: CONTINUE_ONBOARDING,
  };
}

export function removeColor(color) {
  return {
    type: REMOVE_COLOR,
    id: color.id,
  };
}

export function addColor(color) {
  return {
    type: ADD_COLOR,
    color,
  };
}

export function changeColor(color) {
  return {
    type: CHANGE_COLOR,
    color,
  };
}

export function dislikeColor(color) {
  return {
    type: DISLIKE_COLOR,
    color: color.color,
  };
}

export function toggleColorPicker(color) {
  return {
    type: TOGGLE_COLOR_PICKER,
    id: color.id,
  };
}

export function closeAllColorPickers() {
  return {
    type: CLOSE_ALL_COLOR_PICKERS,
  }
}

// TODO: Fix these weird names
export function changeColorText(color, text) {
  return {
    type: CHANGE_COLOR_TEXT,
    id: color.id,
    text,
  };
}

export function editColorText(color, text) {
  return {
    type: EDIT_COLOR_TEXT,
    id: color.id,
    text,
  };
}

export function resetColorName(color) {
  return {
    type: RESET_COLOR_NAME,
    color,
  };
}

export function toggleColorAnimation(color) {
  return {
    type: TOGGLE_COLOR_ANIMATION,
    color,
  };
}

function requestPalette(currentColors) {
  return {
    type: REQUEST_PALETTE,
    currentColors,
  };
}

function receivePalette(palette) {
  // FIXME: whats with this naming?
  return {
    type: RECEIVE_PALETTE,
    colors: palette,
  };
}

export function invalidatePalette() {
  return {
    type: INVALIDATE_PALETTE,
  };
}

export function continueOnboardingIfNeeded() {
  return (dispatch, getState) => {
    const { onboardingStep } = getState();
    // FIXME: This checking logic is scattered around and gross
    if (onboardingStep <= 3 && onboardingStep >= 0) {
      dispatch(continueOnboarding());
    }
  };
}

function fetchPalette(colors, dislikedColors) {
  return dispatch => {
    dispatch(requestPalette(colors));
    // If the app is loading up or there's only one then query for a random new palette
    const apiURL = colors.length <= 1 ? '/api/random' : '/api/change';
    const flattenedColors = colors.map(color => color.color);
    return axios
      .get(apiURL, {
        params: {
          colors: flattenedColors,
          dislikedColors,
        },
      })
      .then(({ data }) => {
        dispatch(receivePalette(data));
      });
  };
}

function shouldFetchPalette(state) {
  const { colors, isFetching, didInvalidate } = state.fetchedPalette;
  if (colors.length === 0) {
    return true;
  } else if (isFetching) {
    return false;
  }
  return didInvalidate;
}

export function fetchColorFromPaletteIfNeeded() {
  return (dispatch, getState) => {
    const state = getState();
    const { dislikedColors, colors } = state.shownPalette;

    // Calls the server for a new palette if current one has been invalidated
    if (shouldFetchPalette(state)) {
      return dispatch(
        fetchPalette(colors, dislikedColors)
      ).then(() => {
        const color = getState().fetchedPalette.colors[0];
        return Promise.resolve(color);
      });
    }

    // Otherwise pulls from the last fetched palette that has been cached
    const color = removeDuplicatesFrom(colors, getState().fetchedPalette.colors);
    return Promise.resolve(color);
  };
}

export function addColorIfValid() {
  return (dispatch, getState) => {
    const { shownPalette, onboardingStep } = getState();
    const { colors } = shownPalette;
    if ((onboardingStep <= 1 || onboardingStep > 3) && colors.length < 5) {
      return dispatch(
        fetchColorFromPaletteIfNeeded()
      ).then(color => {
        dispatch(addColor(color));
      }).then(() => {
        dispatch(continueOnboardingIfNeeded());
      });
    }
    return false;
  };
}

export function changeColorIfValid() {
  return (dispatch, getState) => {
    const { shownPalette, onboardingStep } = getState();
    const { colors } = shownPalette;
    if (onboardingStep === 2 || onboardingStep > 3) {
      dispatch(invalidatePalette());
      dispatch(dislikeColor(colors[colors.length - 1]));

      return dispatch(
        fetchColorFromPaletteIfNeeded()
      )
      .then(color => dispatch(changeColor(color)))
      .then(() => {
        dispatch(continueOnboardingIfNeeded());
      });
    }
    return false;
  };
}

export function removeColorIfValid() {
  return (dispatch, getState) => {
    const { shownPalette, onboardingStep } = getState();
    const { colors } = shownPalette;

    if (colors.length > 1 && onboardingStep >= 3) {
      dispatch(invalidatePalette());
      dispatch(removeColor(...colors.slice(-1)));
      dispatch(continueOnboardingIfNeeded());
    }
  };
}

export function animateColorStatus(color) {
  let animationTimeout;
  clearTimeout(animationTimeout);
  return dispatch => {
    dispatch(toggleColorAnimation(color));

    animationTimeout = setTimeout(() => {
      dispatch(toggleColorAnimation(color));
    }, 1000);
  };
}
