// @flow
export type ColorType = {
  +id: string,
  +hexCode: string,
};

export type ReduxStore = {|
  +likedColors: ColorType[],
  +suggestedColors: ColorType[],
  +dislikedColors: ColorType[],
  +dataStatus: {
    +isFetching: boolean,
    +isStale: boolean,
    +hasFetchFailed: boolean,
  },
|};
