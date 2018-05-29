var express = require('express'),
	bodyParser = require('body-parser'),
	oauthserver = require('oauth2-server');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.oauth = oauthserver({
	model: require('./model.js'),
	grants: ['password', 'client_credentials'],
	debug: true
});

app.all('/oauth/token', app.oauth.grant());

app.get('/profile', app.oauth.authorise(), function (req, res) {
	res.json({name:'sajith' ,id:'set'});
});

app.use(app.oauth.errorHandler());

app.listen(4000);
