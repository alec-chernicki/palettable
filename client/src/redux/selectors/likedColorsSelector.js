// @flow
import type { ReduxStore } from '../../constants/FlowTypes';

const likedColorsSelector = (state: ReduxStore) => {
  return state.likedColors;
};

export default likedColorsSelector;
