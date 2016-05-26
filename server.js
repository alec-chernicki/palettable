'use strict'
/**
 * Initialize middleware
 */
const axios = require('axios')
const colornamer = require('color-namer')
const _ = require('lodash')

axios.defaults.baseURL = 'http://www.colourlovers.com/api/palettes'
axios.defaults.params = { format: 'json' }


/**
 * Create Express app
 */
const express = require('express')
const app = express()

app.set('port', process.env.PORT || 3000)

app.use(express.static(__dirname + '/public'))

app.listen(app.get('port'))

/**
 * Assign routes
 */
app.get('/', function (req, res){
  res.sendFile(__dirname + '/public/index.html')
})

app.get('/api/random', function(req, res, next) {
  getRandom()
    .then(colors => res.json(colors))
    .catch((e) => {
      console.log(e)
      return next(new Error('Error fetching random palette'))
    })
})

function getRandom () {
  return axios.get('/random')
    .then(response => {
      let colors = response.data[0].colors

      if (colors.length < 5) {
        // Continue calling API until palette that's 5 colors long (which is most of
        // them) returns. This is because the API doesn't allow you to search by
        // palette length and doesn't standardize this on their platform.
        return getRandom()
      }
      else {
        return colors
      }
    })
}

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
      // Remove the hash since the API returns strings without it
      const dislikedColorsWithoutHash = dislikedColors.map(color => color.replace(/#/g, ''))

      // Remove all colors that have already been disliked or already shown
      return dislikedColorsWithoutHash.indexOf(color) === -1 && currentColors.indexOf(color) === -1
    })
  // Return a palette containing the first 5 in the array
  // It doesn't matter that it's not random since the colors are unique anyways
  return _.shuffle(_.uniq(colorsWithoutDisliked)).slice(0, 5)
}

app.get('/api/change', function(req, res, next) {
  const currentColors = req.query.colors.map(color => color.replace(/#/g, ''))
  const dislikedColors = req.query.dislikedColors || []
  const searchColor = currentColors[currentColors.length - 2]

  getPalettes({ hex: searchColor })
    .then(palettes => {
      if (!palettes.length) {
        return Promise.resolve(true)
      }
      const newColors = getNewColorsFromData(palettes, dislikedColors, currentColors)

      if (newColors.length < 5) {
        return Promise.resolve(true)
      }
      res.json(newColors)
      return Promise.resolve(false)
    })
    .then(failedSearchByHex => {
      // FIXME: This is SUPER hacky control flow, ask someone how to do this with Promises
      if (failedSearchByHex) {
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
    })
    .then(failedSearchByHex => {
      // FIXME: This constant checking is causing SERIOUS latency
      // refactor into a better architecture, maybe passing back a flag back
      // that the client can use to know what request to send next?
      if (failedSearchByHex) {
        getRandom()
          .then(colors => res.json(colors))
          .catch((e) => {
            console.log(e)
            return next(new Error('Error fetching random palette'))
          })
      }
    })
    .catch((e) => {
      console.log(e);
      return next(new Error('Error fetching palettes'))
    })
})
