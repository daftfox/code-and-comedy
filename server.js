var express = require('express');
var app = express();


// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/dist'));

// set the home page route
app.get('/', function(req, res) {
  // make sure index is in the right directory. In this case /app/index.html
  res.render('index');
});

module.exports = app;
