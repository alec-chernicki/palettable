// @flow
const express = require('express');
const bodyParser = require('body-parser');

// Create Express App
const app = express();

// Initialize Middleware
app.set('port', process.env.PORT || 3001);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Controllers
const paletteController = require('./controllers/paletteController');
const imageController = require('./controllers/imageController');

// Assign Routes and Controllers
app.get('/api/image/:palette', imageController.drawImage);
app.get(
  '/api/palette',
  paletteController.fetchRandomPalette,
  paletteController.fetchPaletteWithHexCode,
  paletteController.fetchPaletteWithSearchWord,
  paletteController.fetchRandomPalette
);

/**
 * Initialize Express server
 */
app.listen(app.get('port'), function() {
  console.log(
    'Express server listening on port %d in %s mode',
    app.get('port'),
    app.get('env')
  );
});
