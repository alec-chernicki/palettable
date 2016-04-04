/**
 * Initialize middleware
 */
var path = require('path');

/**
 * Create Express app
 */
var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

/**
 * Setup server for Socket.io
 */
var server = app.listen(app.get('port'));

/**
 * Assign routes
 */
app.get('*', function (req, res){
  res.sendFile(__dirname + '/public/index.html');
})
