// @flow
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { COLOR_LIKED } from '../actions/ActionTypes';
import suggestedColorSelector from '../selectors/suggestedColorSelector';
import { addLikedColor } from '../actions/likedColors';
import { receivePalette } from '../actions/suggestedColors';
import fetchPaletteWithColors from '../observables/fetchPaletteWithColors';
import type { ReduxStore, ColorType } from '../../constants/FlowTypes';
import { setIsFetching } from '../actions/dataStatus';

const _canAddColorSelector = ({ likedColors, dataStatus }) => {
  return likedColors.length < 5 && dataStatus.isFetching === false;
};

const likeColor = (action$: Object, store: Object) => {
  return action$
    .ofType(COLOR_LIKED)
    .filter(() => _canAddColorSelector(store.getState()))
    .switchMap(() => {
      const state: ReduxStore = store.getState();
      const suggestedColor = suggestedColorSelector(state);

      if (!suggestedColor) {
        // TODO: This escape hatch will be deprecated,
        // need to figure out a way around this.
        store.dispatch(setIsFetching(true));

        return fetchPaletteWithColors(state).flatMap(
          (response: ColorType[]) => {
            // TODO: This response needs to be parsed with an adapted version
            // of suggested color selector that takes API response rather than
            // the redux state tree.
            return [
              setIsFetching(false),
              receivePalette(response),
              addLikedColor(response[0]),
            ];
          }
        );
      }

      return Observable.of(addLikedColor(suggestedColor));
    });
};

export default likeColor;
