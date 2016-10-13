var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));

app.use(express.static('public'));
app.use(express.static('bower_components'));

var port = process.env.PORT || 3000;
var apiUrl = process.env.API_URL || "http://localhost:3001/";

app.use('/',function(req, res) {
	res.render('index' , {api: apiUrl});
});

app.listen(port, function() {
	console.log('Express app Poker APP server has started on port ' + port);
	console.log('Connecting to API_URL=' + apiUrl);
});
