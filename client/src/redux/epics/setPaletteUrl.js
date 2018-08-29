// @flow
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/ignoreElements';
import 'rxjs/add/observable/empty';
import { Observable } from 'rxjs/Observable';
import {
  LIKED_COLOR_CHANGED,
  LIKED_COLOR_ADDED,
  LIKED_COLOR_REMOVED,
} from '../actions/ActionTypes';
import url from '../../utils/url';
import likedColorsSelector from '../selectors/likedColorsSelector';
import { baseUrl } from '../../constants/links';

const updatableActions = [
  LIKED_COLOR_CHANGED,
  LIKED_COLOR_ADDED,
  LIKED_COLOR_REMOVED,
];

const setPaletteUrl = (action$: Object, store: Object) => {
  return action$
    .filter(({ type }) => updatableActions.indexOf(type) !== -1)
    .do(() => {
      const newPalette = likedColorsSelector(store.getState());

      window.history.replaceState(
        {},
        'Palettable',
        baseUrl(url.stringifyColors(newPalette))
      );

      return Observable.empty();
    })
    .ignoreElements();
};

export default setPaletteUrl;
