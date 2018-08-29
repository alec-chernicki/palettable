// @flow
import {
  IS_FETCHING_SET,
  IS_STALE_SET,
  HAS_FETCH_FAILED_SET,
} from './ActionTypes';

type SetIsFetchingAction = {
  type: typeof IS_FETCHING_SET,
  payload: boolean,
};

type SetIsStaleAction = {
  type: typeof IS_STALE_SET,
  payload: boolean,
};

type SetHasFetchFailedAction = {
  type: typeof HAS_FETCH_FAILED_SET,
  payload: boolean,
};

export type DataStatusActions =
  | SetIsFetchingAction
  | SetIsStaleAction
  | SetHasFetchFailedAction;

export const setIsFetching = (isFetching: boolean): SetIsFetchingAction => {
  return { type: IS_FETCHING_SET, payload: isFetching };
};

export const setIsStale = (isStale: boolean): SetIsStaleAction => {
  return { type: IS_STALE_SET, payload: isStale };
};

export const setHasFetchFailed = (
  hasFetchFailed: boolean
): SetHasFetchFailedAction => {
  return { type: HAS_FETCH_FAILED_SET, payload: hasFetchFailed };
};
