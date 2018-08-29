// @flow
import type { ColorType } from '../../constants/FlowTypes';
import { PALETTE_RECEIVED, PALETTE_REQUESTED } from './ActionTypes';

type ReceivePaletteAction = {
  type: typeof PALETTE_RECEIVED,
  payload: ColorType[],
};

type RequestPaletteAction = {
  type: typeof PALETTE_REQUESTED,
  payload: null,
};

export type SuggestedColorActions = ReceivePaletteAction | RequestPaletteAction;

export const receivePalette = (palette: ColorType[]): ReceivePaletteAction => {
  return { type: PALETTE_RECEIVED, payload: palette };
};

export const requestPalette = (): RequestPaletteAction => {
  return { type: PALETTE_REQUESTED, payload: null };
};
