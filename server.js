'use strict';
/**
 * Initialize middleware
 */
const path = require('path');
const axios = require('axios');
const request = require('request');
const baseRequest = request.defaults({
  baseUrl: 'http://www.colourlovers.com/api/palettes',
  qs: {
    format: 'json'
  }
});
axios.defaults.baseURL = 'http://www.colourlovers.com/api/palettes';
axios.defaults.params = { format: 'json' }


/**
 * Create Express app
 */
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

/**
 * Setup server for Socket.io
 */
var server = app.listen(app.get('port'));

function randomIndexOf (arr) {
  let randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function filterDuplicatesFromData (currentColors, data) {
  let newColors = randomIndexOf(data).colors;
  let uniqueColors = newColors.filter((value) => currentColors.indexOf(value) === -1);

  return uniqueColors;
}

/**
 * Assign routes
 */
app.get('/', function (req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/random', function(req, res, next) {
  // Continue calling API until palette that's 5 colors long (which is most of
  // them) returns. This is because the API doesn't allow you to search by
  // palette length and doesn't standardize this on their platform.
  function getRandom () {
    axios.get('/random')
      .then(response => {
        let colors = response.data[0].colors;

        if (colors.length < 5) {
          getRandom();
        }
        else {
          res.json(colors);
        }
      })
      .catch(error => {
        return next(new Error('Error fetching random palette'));
      })
  }
  getRandom();
});

function getPalettes (colors) {
  return axios.get('/', { params: { hex: colors }})
    .then(request => {
      return request.data
    })
    .catch(e => {
      return next(new Error('Error fetching palettes'));
    })
}

app.get('/api/change', function(req, res, next) {
  const currentColors = req.query.colors.map(color => color.replace(/#/g, ''));
  console.log(currentColors);
  const dislikedColor = currentColors[currentColors.length - 1];
  const searchColor = currentColors[currentColors.length - 2];

  getPalettes(searchColor)
    .then(palettes => {
      let palettesWithoutDisliked = palettes.filter(palette => palette.colors.indexOf(dislikedColor) === -1);
      let uniquePalettes = palettesWithoutDisliked.length ? palettesWithoutDisliked : palettes
      let newColors = filterDuplicatesFromData(currentColors, palettesWithoutDisliked);
      res.json(newColors)
    })
    .catch(e => {
      console.log(e)
    })
});
