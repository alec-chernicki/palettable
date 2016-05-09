'use strict';
/**
 * Initialize middleware
 */
const path = require('path');
const request = require('request');
const baseRequest = request.defaults({
  baseUrl: 'http://www.colourlovers.com/api/palettes',
  qs: {
    format: 'json'
  }
});

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

// Returns a random color palette from the API
app.get('/api/random', function(req, res, next) {

  // Continue calling API until palette that's 5 colors long (which is most of
  // them) returns. This is because the API doesn't allow you to search by
  // palette length and doesn't standardize this on their platform.
  (function getRandom () {
    baseRequest('/random', function (err, request, body) {
      if (request.statusCode === 403) {
        return next(new Error('Error retrieving random palette'));
      }

      let colors = JSON.parse(body)[0].colors;

      if (colors.length < 5) {
        getRandom();
      }
      else {
        res.json(colors);
      }
    });
  })()
});


// TODO: After refactor, could we combine this with the add route somehow?
// Returns a color palette that doesn't include the disliked color or current colors
app.get('/api/change', function(req, res, next) {
  const currentColors = req.query.colors;
  const dislikedColor = currentColors[currentColors.length - 1];
  const colorsWithoutLast = [...currentColors.slice(0, currentColors.length - 1)];

  baseRequest({url: '/', qs: { hex: colorsWithoutLast }}, function(err, request, body) {
    if (request.statusCode === 403) {
      return next(new Error('Error changing exact palettes'));
    }
    let colorData = JSON.parse(body);

    if (colorData.length > 1) {
      let uniqueColorPalettes = colorData.filter((palette) => palette.colors.indexOf(dislikedColor) === -1);
      let newColor = filterDuplicatesFromData(currentColors, uniqueColorPalettes);

      res.json(newColor)
    }

    else {
      baseRequest({url: '/', qs: { hex: colorsWithoutLast[colorsWithoutLast.length - 1] }}, function(err, request, body) {
        if (request.statusCode === 403) {
          return next(new Error('Error changing unique palettes'));
        }

        let colorData = JSON.parse(body);
        // TODO: Performing a filter when may not need, feels weird, refactor
        let palettesWithoutDisliked = colorData.filter((palette) => palette.colors.indexOf(dislikedColor) === -1);
        let uniqueColorPalettes = colorData.length > 1 ? palettesWithoutDisliked : colorData;
        let newColor = filterDuplicatesFromData(currentColors, uniqueColorPalettes);

        res.json(newColor);
      });
    }
  });
});
