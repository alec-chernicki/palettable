// @flow
import type { ReduxStore } from '../../constants/FlowTypes';

const getIsFetchingSelector = (state: ReduxStore): boolean => {
  return !state.suggestedColors.length;
};

export default getIsFetchingSelector;
