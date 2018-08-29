// @flow
import type { ReduxStore } from '../../constants/FlowTypes';

const hasFetchFailed = (state: ReduxStore) => {
  return state.dataStatus.hasFetchFailed;
};

export default hasFetchFailed;
