// @flow
import axios from 'axios';
import paletteAdapter from '../adapters/paletteAdapter';
import type { ColorType } from '../constants/FlowTypes';

const CHANGE_ENDPOINT = '/api/palette';

const PaletteAPI = {
  fetchPalette({
    likedColors = [],
    dislikedColors = [],
  }: {
    likedColors: ColorType[],
    dislikedColors: ColorType[],
  } = {}): Promise<ColorType[]> {
    const options = {
      params: {
        colors: likedColors,
        dislikedColors,
      },
    };

    return axios
      .get(CHANGE_ENDPOINT, options)
      .then(({ data }: { data: Array<string> }) => data)
      .then(paletteAdapter);
  },
};

export default PaletteAPI;
