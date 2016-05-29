const axios = require('axios');
const _ = require('lodash');
const colornamer = require('color-namer');

function getPalettes(params) {
  return axios.get('/', { params })
    .then(request => request.data);
}

function getNewColorsFromData(palettes, dislikedColors, currentColors) {
  const colorsWithoutDisliked = palettes
    // Flatten data into single array of all returned colors
    .reduce((a, b) => ((a).concat(b.colors)), palettes[0].colors)
    // Remove all colors that have already been disliked or already shown
    .filter(color => (
      dislikedColors.indexOf(`#${color}`) === -1 && currentColors.indexOf(`#${color}`) === -1
    ));
  // Return a palette containing the first 5 in the array
  return _.shuffle(_.uniq(colorsWithoutDisliked)).slice(0, 5);
}

exports.hasExactMatch = (req, res, next) => {
  const currentColors = req.query.colors;
  const dislikedColors = req.query.dislikedColors || [];
  // Color to search for is second to last since the last is the one being changed
  const searchColor = currentColors[currentColors.length - 2];

  getPalettes({ hex: searchColor })
    .then(palettes => {
      if (!palettes.length) {
        return next();
      }
      const newColors = getNewColorsFromData(palettes, dislikedColors, currentColors);

      if (newColors.length < 5) return next();

      return res.json(newColors);
    })
    .catch(() => next(new Error('Error fetching exact match')));
};

exports.hasClosestHexMatch = (req, res, next) => {
  // Transforms HEX code into a search term then queries the API with term
  const currentColors = req.query.colors;
  const dislikedColors = req.query.dislikedColors || [];
  // Color to search for is second to last since the last is the one being changed
  const searchColor = currentColors[currentColors.length - 2];
  const searchTerm = colornamer(searchColor).html[0].hex;

  getPalettes({ hex: searchTerm }, next)
    .then(palettes => {
      const newColors = getNewColorsFromData(palettes, dislikedColors, currentColors);

      if (newColors.length < 5) return next();

      return res.json(newColors);
    })
    .catch(() => next(new Error('Error fetching closest hex match')));
};
