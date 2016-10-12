var express = require('express');
var app = express();
var http = require('http');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));

app.use(express.static('public'));
app.use(express.static('bower_components'));

app.use('/',function(req, res) {
	res.render('index' , {api: process.env.API_URL || "http://localhost:3001/"});
});


app.use('/decknew',function(reqFromClient, resFromClient) {
	var options = {
	  host: 'api',
	  path: '/Deck/new',
	  port: '3000',
	};

	callback = function(responseFromApi) {
	  var str = ''
	  responseFromApi.on('data', function (chunk) {
	    str += chunk;
	  });

	  responseFromApi.on('end', function () {
	    console.log(str);
			resFromClient.setHeader('Content-Type', 'application/json')
			resFromClient.send(str);
	  });
	}

	var reqToApi = http.request(options, callback);
	reqToApi.end();
});


app.listen(process.env.PORT || 3000, function() {
	console.log('server has started');
});
