// @flow
import paletteAdapter from '../adapters/paletteAdapter';
import isHex from '../utils/isHex';
import Color from 'color';
import type { ColorType } from '../constants/FlowTypes';

const _colorsToString = (colors: ColorType[]): string => {
  return colors
    .map(colorItem => {
      const formattedColor: string = Color(colorItem.hexCode).hex();

      return formattedColor.replace('#', '');
    })
    .join('-');
};

const _stringToColors = (): ColorType[] => {
  const path: string = window.location.pathname.split('/')[1];

  if (!path) {
    return [];
  }

  const colorsArray: Array<string> = path.split('-');
  const formattedColors: Array<string> = colorsArray
    .map(color => `#${color}`)
    .filter(isHex);

  return paletteAdapter(formattedColors);
};

const url = {
  stringifyColors(colors: ColorType[]): string {
    return _colorsToString(colors);
  },
  parseColors() {
    return _stringToColors();
  },
};

export default url;
