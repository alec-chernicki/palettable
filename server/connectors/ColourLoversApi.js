// @flow
const axios = require('axios');
const _ = require('underscore');
const colornamer = require('color-namer');

axios.defaults.baseURL = 'http://www.colourlovers.com/api/palettes';
axios.defaults.params = { format: 'json' };

const _flattenResponse = data => {
  return data.reduce((a, b) => a.concat(b.colors), data[0].colors);
};

const _toColorTypes = hexCodes => {
  if (hexCodes.length === 0) return [];

  return hexCodes.map(hexCode => ({
    id: _.uniqueId('color_'),
    hexCode,
  }));
};

const _toHexCodes = colorTypes => {
  if (colorTypes.length === 0) return [];

  return colorTypes.map(colorType => colorType.hexCode);
};

const _removeDislikedColors = ({ newColors, dislikedColors, likedColors }) => {
  // Remove all colors that have been disliked or are already liked
  return newColors.filter(
    color =>
      dislikedColors.indexOf(`#${color}`) === -1 &&
      likedColors.indexOf(`#${color}`) === -1
  );
};

const _createPalette = colors => {
  // Return a palette containing the first 5 colors in the array
  return colors.slice(0, 5).map(color => `#${color}`);
};

const generatePalette = _.compose(
  _removeDislikedColors,
  // Since we flattened n number of arrays and merged them together,
  // there could be duplicates of the same color. We want to
  // present the user with a new color every time so we exlude these
  // duplicates.
  _.uniq,
  // Human generated palettes tend to be sorted by lightness of color,
  // other times a palette could consist entirely of different shades
  // of the same color. We're shuffling the items in the array to give the
  // user some variance while sorting through different color choices.
  _.shuffle,
  _createPalette,
  _toColorTypes
);

const _fetchPaletteWithHexCode = async ({
  likedHexCodes = [],
  dislikedHexCodes = [],
}) => {
  // Color to search for is second to last since the last is the one being changed
  const colorToSearchFor = likedHexCodes[likedHexCodes.length - 2];

  try {
    const newHexCodes = await axios.get('/', { hex: searchColor });

    if (!newHexCodes.length) return null;

    const paletteWithHexCode = generatePalette({
      newHexCodes,
      likedHexCodes,
      dislikedHexCodes,
    });

    return paletteWithHexCode.length === 5 ? paletteWithHexCode : null;
  } catch (error) {}
};

const _fetchPaletteWithSearchWord = async ({
  likedHexCodes = [],
  dislikedHexCodes = [],
}) => {
  // Color to search for is second to last since the
  // last is the one being changed
  const colorToSearchFor = likedColors[likedColors.length - 2];

  // Transforms HEX code into a search term then queries
  // the API with term. I.e. #FFF will be transformed to
  // something like "glacier white".
  const searchTerm = colornamer(colorToSearchFor).html[0].hex;

  try {
    const newHexCodes = await axios.get('/', { hex: searchTerm });

    if (!newHexCodes.length) return null;

    const paletteWithSearchWord = generatePalette({
      newHexCodes,
      likedHexCodes,
      dislikedHexCodes,
    });

    return paletteWithSearchWord.length === 5 ? paletteWithSearchWord : null;
  } catch (error) {}
};

const _getRandomPalette = async () => {
  const { data } = await axios.get('/random');
  const paletteData = data[0];

  if (paletteData && paletteData.colors.length === 5) {
    return {
      id: _.uniqueId('palette_'),
      colors: _toColorTypes(paletteData.colors.map(color => `#${color}`)),
    };
  }

  // Continue calling API until palette that's 5 colors long (which is most of
  // them) returns. This is because the API doesn't allow you to search by
  // palette length and doesn't standardize this on their platform.
  _getRandomPalette();
};

module.exports = {
  async getPalette({ likedColors = [], dislikedColors = [] }) {
    const likedHexCodes = _toHexCodes(likedColors);
    const dislikedHexCodes = _toHexCodes(dislikedColors);

    if (!likedColors.length && !dislikedColors.length) {
      return _getRandomPalette();
    }

    const paletteWithHexCode = await _fetchPaletteWithHexCode({
      likedColors,
      dislikedColors,
    });

    if (paletteWithHexCode) return paletteWithHexCode;

    const paletteWithSearchWord = await _fetchPaletteWithSearchWord({
      likedColors,
      dislikedColors,
    });

    if (paletteWithSearchWord) return paletteWithHexCode;

    return this.getRandomPalette();
  },
};
