'use strict'

const axios = require('axios')
const _ = require('lodash')
const colornamer = require('color-namer')

function getPalettes(params) {
  return axios.get('/', { params: params })
    .then(request => request.data)
}

function getNewColorsFromData (palettes, dislikedColors, currentColors) {
  const colorsWithoutDisliked = palettes
    .reduce((a, b) => {
      // Normalize the data into a flattened array of colors
      return (a).concat(b.colors)
    }, palettes[0].colors)
    .filter(color => {
      // Remove all colors that have already been disliked or already shown
      return dislikedColors.indexOf('#' + color) === -1 &&
             currentColors.indexOf(color) === -1
    })
  // Return a palette containing the first 5 in the array
  return _.shuffle(_.uniq(colorsWithoutDisliked)).slice(0, 5)
}

exports.hasExactMatch = (req, res, next) => {
  const currentColors = req.query.colors.map(color => color.replace(/#/g, ''))
  const dislikedColors = req.query.dislikedColors || []
  const searchColor = currentColors[currentColors.length - 2]

  getPalettes({ hex: searchColor })
    .then(palettes => {
      if (!palettes.length) {
        return next()
      }
      const newColors = getNewColorsFromData(palettes, dislikedColors, currentColors)

      if (newColors.length < 5) {
        return next()
      }

      res.json(newColors)
    })
}

exports.hasClosestHexMatch = (req, res, next) => {
  const currentColors = req.query.colors.map(color => color.replace(/#/g, ''))
  const dislikedColors = req.query.dislikedColors || []
  const searchColor = currentColors[currentColors.length - 2]
  const searchTerm = colornamer(searchColor).html[0].hex

  getPalettes({ hex: searchTerm }, next)
    .then(palettes => {
      const newColors = getNewColorsFromData(palettes, dislikedColors, currentColors)

      if (newColors.length < 5) {
        return Promise.resolve(true)
      }

      res.json(newColors)
      return Promise.resolve(false)
    })
    .catch(() => {
      return next(new Error('Error fetching palettes'))
    })
}
