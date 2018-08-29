// @flow
import type { SuggestedColorActions } from '../actions/suggestedColors';
import type { ColorType } from '../../constants/FlowTypes';
import { PALETTE_RECEIVED, PALETTE_REQUESTED } from '../actions/ActionTypes';

type State = ColorType[];

const defaultState = [];

export default function reducer(
  state: State = defaultState,
  action: SuggestedColorActions
): State {
  switch (action.type) {
    case PALETTE_RECEIVED:
      return action.payload;

    case PALETTE_REQUESTED:
      return state;

    default:
      return state;
  }
}
