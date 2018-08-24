// @flow
import axios from 'axios';
import paletteAdapter from '../adapters/paletteAdapter';
import type { ColorType } from '../constants/FlowTypes';

const RANDOM_ENDPOINT = '/api/random';
const CHANGE_ENDPOINT = '/api/change';

const PaletteAPI = {
  getWithColors(
    likedColors: ColorType[] = [],
    dislikedColors: ColorType[] = []
  ): Promise<ColorType[]> {
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

  getRandom(): Promise<ColorType[]> {
    return axios
      .get(RANDOM_ENDPOINT)
      .then(({ data }: { data: Array<string> }) => data)
      .then(paletteAdapter);
  },
};

export default PaletteAPI;
