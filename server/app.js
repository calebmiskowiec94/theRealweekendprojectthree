

var express = require('express');
var bodyParser = require('body-parser');
var toDo = require('./routes/toDo');

var app = express();

var port = 5000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/toDo', toDo);

app.listen(port, function() {
	console.log('listening on port', port);
});