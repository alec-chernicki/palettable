const express = require('express');
const compress = require('compression');
const axios = require('axios');
axios.defaults.baseURL = 'http://www.colourlovers.com/api/palettes';
axios.defaults.params = { format: 'json' };

// Create Express App
const app = express();

// Initialize Middleware
app.set('port', process.env.PORT || 3000);
app.use(compress());
app.use(express.static(`${__dirname}/public`));
app.listen(app.get('port'));

// Controllers
const randomController = require('./controllers/randomController');
const changeController = require('./controllers/changeController');

// Assign Routes and Controllers
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.get('/api/random', randomController.getRandom);
app.get('/api/change',
        changeController.hasExactMatch,
        changeController.hasClosestHexMatch,
        randomController.getRandom
      );

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});
