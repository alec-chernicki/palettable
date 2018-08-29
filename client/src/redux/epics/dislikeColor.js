// @flow
import { Observable } from 'rxjs/Observable';
import { COLOR_DISLIKED } from '../actions/ActionTypes';
import suggestedColorSelector from '../selectors/suggestedColorSelector';
import type { ReduxStore } from '../../constants/FlowTypes';
import type { ColorType } from '../../constants/FlowTypes';
import { receivePalette } from '../actions/suggestedColors';
import { changeLikedColor } from '../actions/likedColors';
import fetchPaletteWithColors from '../observables/fetchPaletteWithColors';
import { setIsFetching } from '../actions/dataStatus';

const dislikeColor = (action$: Object, store: Object) => {
  return action$.ofType(COLOR_DISLIKED).switchMap(({ payload }) => {
    const state: ReduxStore = store.getState();
    const suggestedColor = suggestedColorSelector(state);

    if (!suggestedColor) {
      // TODO: This escape hatch will be deprecated,
      // need to figure out a way around this.
      store.dispatch(setIsFetching(true));

      return fetchPaletteWithColors(state).flatMap((response: ColorType[]) => {
        return [
          setIsFetching(false),
          receivePalette(response),
          changeLikedColor({ color: payload, newHexCode: response[0].hexCode }),
        ];
      });
    }

    return Observable.of(
      changeLikedColor({
        color: payload,
        newHexCode: suggestedColor.hexCode,
      })
    );
  });
};

export default dislikeColor;
