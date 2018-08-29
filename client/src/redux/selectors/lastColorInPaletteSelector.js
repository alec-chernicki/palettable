// @flow
import type { ReduxStore, ColorType } from '../../constants/FlowTypes';

const lastColorInPaletteSelector = ({ likedColors }: ReduxStore): ColorType => {
  return likedColors[likedColors.length - 1];
};

export default lastColorInPaletteSelector;
