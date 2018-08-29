// @flow
import { combineEpics } from 'redux-observable';
import fetchInitialPalette from './fetchInitialPalette';
import setPaletteUrl from './setPaletteUrl';
import dislikeColor from './dislikeColor';
import likeColor from './likeColor';

export const rootEpic = combineEpics(
  fetchInitialPalette,
  likeColor,
  setPaletteUrl,
  dislikeColor
);
