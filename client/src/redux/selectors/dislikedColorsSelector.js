// @flow
import type { ReduxStore } from '../../constants/FlowTypes';

const dislikedColorsSelector = (state: ReduxStore) => {
  return state.dislikedColors;
};

export default dislikedColorsSelector;
