'use stict';
const express = require('express');
const compress = require('compression');
const axios = require('axios');
axios.defaults.baseURL = 'http://www.colourlovers.com/api/palettes';
axios.defaults.params = { format: 'json' };

// Create Express App
const app = express();

// Initialize Middleware
app.set('port', process.env.PORT || 3000);
app.set('views', `${__dirname}/views`);
app.set('view engine', 'jade');
app.use(compress());
app.use(express.static(`${__dirname}/public`));
app.listen(app.get('port'));

// Controllers
const randomController = require('./controllers/randomController');
const changeController = require('./controllers/changeController');
const imageController = require('./controllers/imageController');
const homeController = require('./controllers/homeController');

// Assign Routes and Controllers
app.get('/:palette', homeController.getHome);

app.get('/api/image/:palette', imageController.drawMetaImage);

app.get('/api/random', randomController.getRandom);
app.get('/api/change',
        changeController.hasExactMatch,
        changeController.hasClosestHexMatch,
        randomController.getRandom
      );

app.get('*', homeController.getHome);
