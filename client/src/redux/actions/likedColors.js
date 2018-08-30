// @flow
import type { ColorType } from '../../constants/FlowTypes';
import {
  COLOR_LIKED,
  LIKED_COLOR_ADDED,
  LIKED_COLORS_ADDED,
  LIKED_COLOR_REMOVED,
  LIKED_COLOR_CHANGED,
} from './ActionTypes';

type AddLikedColorAction = {
  type: typeof LIKED_COLOR_ADDED,
  payload: ColorType,
};

type AddLikedColorsAction = {
  type: typeof LIKED_COLORS_ADDED,
  payload: ColorType[],
};

type RemoveLikedColorAction = {
  type: typeof LIKED_COLOR_REMOVED,
  payload: ColorType,
};

type ChangeLikedColorAction = {
  type: typeof LIKED_COLOR_CHANGED,
  payload: { color: ColorType, newHexCode: string },
};

export type LikedColorsActions =
  | ChangeLikedColorAction
  | AddLikedColorAction
  | AddLikedColorsAction
  | RemoveLikedColorAction;

export const addLikedColor = (color: ColorType): AddLikedColorAction => {
  return { type: LIKED_COLOR_ADDED, payload: color };
};

export const addLikedColors = (colors: ColorType[]): AddLikedColorsAction => {
  return { type: LIKED_COLORS_ADDED, payload: colors };
};

export const removeLikedColor = (color: ColorType): RemoveLikedColorAction => {
  return { type: LIKED_COLOR_REMOVED, payload: color };
};

export const changeLikedColor = ({
  color,
  newHexCode,
}: {
  color: ColorType,
  newHexCode: string,
}): ChangeLikedColorAction => {
  return { type: LIKED_COLOR_CHANGED, payload: { color, newHexCode } };
};

export const likeColor = (color: ColorType): AddLikedColorAction => {
  return { type: COLOR_LIKED, payload: color };
};
