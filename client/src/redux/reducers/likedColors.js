// @flow
import shortId from 'shortid';
import type { LikedColorsActions } from '../actions/likedColors';
import type { ColorType } from '../../constants/FlowTypes';
import {
  LIKED_COLOR_ADDED,
  LIKED_COLORS_ADDED,
  LIKED_COLOR_REMOVED,
  LIKED_COLOR_CHANGED,
} from '../actions/ActionTypes';

type State = ColorType[];

const initialState = [];

export default function reducer(
  state: State = initialState,
  action: LikedColorsActions
): State {
  switch (action.type) {
    case LIKED_COLOR_ADDED:
      const newLikedColor: ColorType = {
        ...action.payload,
        id: shortId.generate(),
      };

      return [...state, newLikedColor];

    case LIKED_COLORS_ADDED:
      const colorsWithIds: ColorType[] = action.payload.map(color => {
        return {
          ...color,
          id: shortId.generate(),
        };
      });

      return [...state, ...colorsWithIds];

    case LIKED_COLOR_CHANGED:
      const { color, newHexCode } = action.payload;

      return state.map(likedColor => {
        if (likedColor.id !== color.id) {
          return likedColor;
        }

        return {
          ...likedColor,
          hexCode: newHexCode,
        };
      });

    case LIKED_COLOR_REMOVED:
      const { id } = action.payload;

      return state.filter(color => {
        return color.id !== id;
      });

    default:
      return state;
  }
}
