// @flow
import { COLOR_DISLIKED, DISLIKED_COLOR_ADDED } from '../actions/ActionTypes';

type AddDislikedColorAction = {
  type: typeof DISLIKED_COLOR_ADDED,
  payload: Object,
};

type DislikedColorAction = {
  type: typeof COLOR_DISLIKED,
  payload: Object,
};

export type DislikedColorActions = AddDislikedColorAction | DislikedColorAction;

export const addDislikedColor = (color: Object): AddDislikedColorAction => {
  return { type: DISLIKED_COLOR_ADDED, payload: color };
};

export const dislikeColor = (color: Object): DislikedColorAction => {
  return { type: COLOR_DISLIKED, payload: color };
};
