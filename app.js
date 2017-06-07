var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', index); // use routes from index.js with prefix '/'

app.listen(3000, function(){
	console.log('Server Started on Port 3000...');
});

module.exports = app;