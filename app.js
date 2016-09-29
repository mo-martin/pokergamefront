var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.static('bower_components'));

app.use('/',function(req, res) {
	res.render('index' , {api: process.env.API_URL || "http://192.10.10.150"});
});

app.listen(process.env.PORT || 3000, function() {
	console.log('server has started');
});