// @flow
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import Raven from 'raven-js';
import { Observable } from 'rxjs/Observable';
import PaletteAPI from '../../api/PaletteAPI';
import { receivePalette } from '../actions/suggestedColors';
import { addLikedColor } from '../actions/likedColors';
import { PALETTE_REQUESTED } from '../actions/ActionTypes';
import type { ColorType } from '../../constants/FlowTypes';
import { setHasFetchFailed } from '../actions/dataStatus';

const fetchInitialPalette = (action$: Object, store: Object) => {
  return action$.ofType(PALETTE_REQUESTED).mergeMap(action => {
    return Observable.fromPromise(PaletteAPI.fetchPalette())
      .mergeMap((response: ColorType[]) => {
        return [receivePalette(response), addLikedColor(response[0])];
      })
      .catch(err => {
        Raven.captureException(err);
        return Observable.of(setHasFetchFailed(true));
      });
  });
};

export default fetchInitialPalette;
