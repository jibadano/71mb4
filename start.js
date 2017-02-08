/*
 * 	Index 0.0.1
 *
 *	jibadano@gmail.com
 *	Date: 2015-11-24
 */
setTimeout(function(){
	
	
	
	'use strict';
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gmail.user@gmail.com',
        pass: 'yourpass'
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
    to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});
	
	
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
},3000);

console.log("starting 71mb4");
