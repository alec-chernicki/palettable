// @flow
import type { DislikedColorActions } from '../actions/dislikedColors';
import type { ColorType } from '../../constants/FlowTypes';
import { COLOR_DISLIKED, DISLIKED_COLOR_ADDED } from '../actions/ActionTypes';

type State = ColorType[];

const initialState = [];

export default function reducer(
  state: State = initialState,
  action: DislikedColorActions
): State {
  switch (action.type) {
    case COLOR_DISLIKED:
      return [...state, action.payload];

    case DISLIKED_COLOR_ADDED:
      return [...state, action.payload];

    default:
      return state;
  }
}
