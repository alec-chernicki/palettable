'use strict'
/**
 * Initialize middleware
 */
const axios = require('axios')
const colornamer = require('color-namer')
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

function randomIndexOf (arr) {
  let randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex]
}

function filterDuplicatesFromData (currentColors, data) {
  let newColors = randomIndexOf(data).colors
  let uniqueColors = newColors.filter((value) => currentColors.indexOf(value) === -1)

  return uniqueColors
}

/**
 * Assign routes
 */
app.get('/', function (req, res){
  res.sendFile(__dirname + '/public/index.html')
})

app.get('/api/random', function(req, res, next) {
  // Continue calling API until palette that's 5 colors long (which is most of
  // them) returns. This is because the API doesn't allow you to search by
  // palette length and doesn't standardize this on their platform.
  function getRandom () {
    axios.get('/random')
      .then(response => {
        let colors = response.data[0].colors

        if (colors.length < 5) {
          getRandom()
        }
        else {
          res.json(colors)
        }
      })
      .catch(() => {
        return next(new Error('Error fetching random palette'))
      })
  }
  getRandom()
})

function getPalettes(params, next) {
  return axios.get('/', { params: params })
    .then(request => request.data)
    .catch(() => {
      return next(new Error('Error fetching palettes'))
    })
}

function getNewColorsFromData (palettes, dislikedColor, currentColors) {
  const palettesWithoutDisliked = palettes.filter(palette => palette.colors.indexOf(dislikedColor) === -1)
  const uniquePalettes = palettesWithoutDisliked.length ? palettesWithoutDisliked : palettes
  return filterDuplicatesFromData(currentColors, uniquePalettes)
}

app.get('/api/change', function(req, res, next) {
  const currentColors = req.query.colors.map(color => color.replace(/#/g, ''))
  const dislikedColor = currentColors[currentColors.length - 1]
  const searchColor = currentColors[currentColors.length - 2]

  getPalettes({ hex: searchColor }, next)
    .then(palettes => {
      if (!palettes.length) {
        return Promise.resolve(true)
      }
      const newColors = getNewColorsFromData(palettes, dislikedColor, currentColors)
      res.json(newColors)
      return Promise.resolve(false)
    })
    .then(failedSearchByHex => {
      // FIXME: This is SUPER hacky control flow, ask someone how to do this with Promises
      if (failedSearchByHex) {
        const searchTerm = colornamer(searchColor).html[0].hex
        getPalettes({ hex: searchTerm }, next)
          .then(palettes => {
            console.log(palettes);
            const newColors = getNewColorsFromData(palettes, dislikedColor, currentColors)
            res.json(newColors)
          })
          .catch(e => {
            console.log(e)
          })
      }
    })
    .catch(e => {
      console.log(e)
    })
})
