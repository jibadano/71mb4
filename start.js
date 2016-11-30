/*
 * 	Index 0.0.1
 *
 *	jibadano@gmail.com
 *	Date: 2015-11-24
 */

//Modules
var express = require('express');
var session = require('express-session');

//Server modules
var server = require('./scripts/server/server');
var database = require('./scripts/server/database');
var router = require('./scripts/server/router');
var requestHandler = require('./scripts/server/requestHandler');

//Config application
var app = express();
app.use(express.static('.'));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000}
}))


//Parameters
app.locals.host = "0.0.0.0";
app.locals.port = 8080;

//Run application
router.init(app,requestHandler);
server.init(app);

