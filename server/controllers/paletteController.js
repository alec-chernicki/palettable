const axios = require('axios');
const _ = require('underscore');
const colornamer = require('color-namer');

axios.defaults.baseURL = 'http://www.colourlovers.com/api/palettes';
axios.defaults.params = { format: 'json' };

const _formatColors = colors => {
  return colors.map(color => `#${color}`);
};

const _flattenResponse = data => {
  return data.reduce((a, b) => a.concat(b.colors), data[0].colors);
};

const _removeShownColors = ({ newColors, dislikedColors, likedColors }) => {
  // Remove all colors that have been disliked or are already liked
  return newColors.filter(
    color =>
      dislikedColors.indexOf(`#${color}`) === -1 &&
      likedColors.indexOf(`#${color}`) === -1
  );
};

const _createPalette = colors => {
  // Return a palette containing the first 5 colors in the array
  return colors.slice(0, 5);
};

const generatePalette = _.compose(
  _flattenResponse,
  _removeShownColors,
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
  _formatColors
);

module.exports.fetchPaletteWithHexCode = async (req, res, next) => {
  const { likedColors = [], dislikedColors = [] } = req.query;
  // Color to search for is second to last since the last is the one being changed
  const searchColor = likedColors[likedColors.length - 2];

  try {
    const newColors = await axios.get('/', { hex: searchColor });

    if (!newColors.length) {
      return next();
    }

    const palette = generatePalette({
      newColors,
      dislikedColors,
      likedColors,
    });

    if (palette.length !== 5) return next();

    return res.json(palette);
  } catch (error) {
    res.status(500);
    res.send('Error fetching exact match');
  }
};

module.exports.fetchPaletteWithSearchWord = async (req, res, next) => {
  const { likedColors = [], dislikedColors = [] } = req.query;
  // Color to search for is second to last since the last is the one being changed
  const searchColor = likedColors[likedColors.length - 2];

  // Transforms HEX code into a search term then queries the API with term
  const searchTerm = colornamer(searchColor).html[0].hex;
  try {
    const newColors = await axios.get('/', { hex: searchTerm });

    const palette = generatePalette({
      newColors,
      dislikedColors,
      likedColors,
    });

    if (palette.length < 5) return next();

    return res.json(palette);
  } catch (error) {
    res.status(500);
    res.send('Error fetching closest hex match');
  }
};

module.exports.fetchRandomPalette = async (req, res, next) => {
  const { likedColors = [], dislikedColors = [] } = req.query;

  if (likedColors.length !== 0 && dislikedColors !== 0) {
    return next();
  }

  try {
    const recursiveFetch = async () => {
      const response = await axios.get('/random');
      const palette = response.data[0].colors;

      if (palette.length === 5) return palette;

      return recursiveFetch();
    };

    const palette = await recursiveFetch();

    // Continue calling API until palette that's 5 colors long (which is most of
    // them) returns. This is because the API doesn't allow you to search by
    // palette length and doesn't standardize this on their platform.
    res.json(_formatColors(palette));
  } catch (error) {
    res.status(500);
    res.send('Error fetching random palette');
  }
};
