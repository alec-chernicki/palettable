// @flow
import type { DataStatusActions } from '../actions/dataStatus';
import {
  HAS_FETCH_FAILED_SET,
  IS_FETCHING_SET,
  IS_STALE_SET,
} from '../actions/ActionTypes';

type State = {
  +isFetching: boolean,
  +isStale: boolean,
  +hasFetchFailed: boolean,
};

const initialState = {
  isFetching: false,
  isStale: false,
  hasFetchFailed: false,
};

export default function reducer(
  state: State = initialState,
  action: DataStatusActions
): State {
  switch (action.type) {
    case HAS_FETCH_FAILED_SET:
      return {
        ...state,
        hasFetchFailed: action.payload,
      };
    case IS_FETCHING_SET:
      return {
        ...state,
        isFetching: action.payload,
      };
    case IS_STALE_SET:
      return {
        ...state,
        isStale: action.payload,
      };
    default:
      return state;
  }
}
