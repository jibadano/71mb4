/*
 * 	Request Handler 0.0.1
 *
 *	jibadano@gmail.com
 *	Date: 2015-11-24
 */

var database = require('./database');
var eh = require('./errorHandler');
var random = require('./random');
var atob = require('atob');
var io = require('socket.io').listen(8081);
io.set('origins','*:*');
var $ = require('jquery');
var mail = require('./mail');
io.sockets.on('connection', function(socket){
	sockets.push(socket);
	socket.emit('timbaChange',timba);
});

var logType = {CHAT:0, LOGIN:1, LOGOUT:2, KICKED:3,TIMBA:4};
var sockets = [];

//Timba session
var timba = {
	betAmount: 10,
	maxBetsPerPlayer : 50,
	date: new Date(),
	log: [{type:logType.TIMBA, email: 'timbaBot@', msg: 'Timba has been created successfully!'}],
	players: [],
	winner: undefined,
	winnerIndex: 0,
	closed: false,
	status: 0
}

/*
*	Services
*/

var services = {
//ADD USER
addUser : function (user, data, then){
	database.insertUser(data.user,function(err,user){
		if(err)
			then(eh.DATABASE(err),null);
		
		return then(null, '');
	});
},

//Notify Close
notifyClose : function (user, data, then){
	if(user.admin){
		database.findUsers({}, function(err, users) {
			if(err)
				return res.end(eh.DATABASE(err));

			users.forEach(function(user){
				mail.send(user.email,'La timba está por comenzar', user.email + ' faltan 10 minutos para el cierre de la timba');
			});
		});
		return then(null, '');
	}
	return then('admin violation', undefined);
},

//SET BET data.action = ['ADD','SUBSTRACT']
setBet : function (user, data, then){
	var i = getPlayerIndex(user.email);
	
	if(!timba.closed && i != -1){
		if(data.action == 'ADD' && timba.players[i].bets < 10){
			timba.players[i].bets++;
			sendTimba();
		}
		else if(data.action == 'SUBSTRACT' && timba.players[i].bets > 0){
			timba.players[i].bets--;
			sendTimba();
		}
	}

	return then(null, '');
},

//REMOVE PLAYER 
removePlayer : function (user, data, then){
	if(user.admin){
		removePlayer(data.player.email);
		timba.log.push({type:logType.KICKED, email:user.email, msg: user.email + ' kicked'});
		sendTimba();
		return then(null, '');
	}
	return then('admin violation', undefined);
},

//ADD LOG
addLog : function (user, data, then){
	if(data.log.type == logType.CHAT)
		data.log.email = user.email;
	else if(!user.admin)
		return then('user violation',undefined);
	
	timba.log.push(data.log);
	sendTimba();
	sendLog();
	return then(undefined,timba);
},

//GET CURRENT USER
getCurrentUser : function (user, data, then){
	sendTimba();
	return then(undefined,user);
},

//GET TIMBA
getTimba: function (user, data, then){
	return then(undefined, timba);
},

//CLOSE TIMBA
closeTimba: function (user, data, then){
	if(user.admin){
		addBotLog(logType.TIMBA, 'SE CERRO LA TIMBA, EN BREVE LOS VISITARÁ EL RECAUDADOR');
		timba.closed = true;
		sendTimba();
		sockets.forEach(function(socket){
			socket.emit('timbaClosed');
		});
	}
	return then(undefined, {});
},

//START TIMBA
startTimba : function(user, data, then){
	var finalList = [];
	for(var i=0; i<timba.players.length;i++)
		for(var j=0; j< timba.players[i].bets; j++)
			finalList.push(timba.players[i].email);
		
	random.get(finalList.length, function(winnerIndex){
		timba.winnerIndex = getPlayerIndex(finalList[winnerIndex]);
		sockets.forEach(function(socket){
			socket.emit('timbaStart', timba);
		});
		
	});
	then(undefined,{});
	setTimeout(function(){
		timba.winner = timba.players[timba.winnerIndex].email;
		addBotLog(logType.TIMBA, 'GANADOR: ' + timba.winner);
		sendTimba();
	},30000);
	
	},
}

function getCurrentUser(req, res){
	if(req.session.user)
		return res.end(JSON.stringify(req.session.user));
	return res.end('{}');
}

function sendTimba(){
	sockets.forEach(function(socket){
		socket.emit('timbaChange',timba);
	});
}


//Common methods


/*	
*		REDIRECT
*/
function redirect(req, res){
	res.redirect('/');
}

/*	
*		forgotPassword
*/
function forgotPassword(req, res) {
	if(req.session.user)
		return res.end(eh.USER.ALRDY_LOGGED_IN);
	
	var enc_auth = req.headers.authorization;
	var auth = atob(enc_auth.substring(6,enc_auth.length));
	
	var email = auth.split(':')[0];
	var password = auth.split(':')[1];
	
	database.findUser({email:email}, function(err, user) {
		if(err)
			return res.end(eh.DATABASE(err));

		if(!user)
			return res.end(eh.USER.AUTH_FAILED);
		
		mail.send(user.email,'forgot password','user: ' + user.email + ' password: ' + user.password);
		res.end();
	});
}


function signIn(req, res) {
	if(req.session.user)
		return res.end(eh.USER.ALRDY_LOGGED_IN);
	
	var enc_auth = req.headers.authorization;
	var auth = atob(enc_auth.substring(6,enc_auth.length));
	
	var email = auth.split(':')[0];
	var password = auth.split(':')[1];
	
	var usr = {email: email, password: password, firstLogin: false, admin: false};
	
	database.insertUser(usr,function(err,user){
		
	});
	res.end();
}

/*	
*		Logout
*/
function logout(req, res) {
	if(req.session.user){
		removePlayer(req.session.user.email);
		timba.log.push({type:logType.LOGOUT, email:'timbaBot@', msg: req.session.user.email + ' disconnected'});
		delete req.session.user;
		sendTimba();
	}
	res.end('{}');
}

/*	
*		Login
*/
function login(req, res) {

	if(req.session.user)
		return res.end(eh.USER.ALRDY_LOGGED_IN);
	
	var enc_auth = req.headers.authorization;
	var auth = atob(enc_auth.substring(6,enc_auth.length));
	
	var email = auth.split(':')[0];
	var password = auth.split(':')[1];
	
	database.findUserBasic({email:email, password:password}, function(err, user) {
		if(err)
			return res.end(eh.DATABASE(err));

		if(!user)
			return res.end(eh.USER.AUTH_FAILED);
		
		if(getPlayerIndex(email) == -1){
			timba.players.push({email:user.email, bets:0});
			timba.log.push({type:logType.LOGIN, email: 'timbaBot@', msg: user.email + ' connected'});
			sendTimba();
		}
		
		delete user.password;
		req.session.user = user;
		res.end(JSON.stringify(user));
	});
}


/*	
*		ExecService
*/
function execService(req, res) {
	getData(req, function(serviceExecution){
		if(!req.session.user){
			serviceExecution.err = eh.USER.SESSION_EXPIRED;
			return res.end(JSON.stringify(serviceExecution));
		}

		try{
			services[serviceExecution.serviceId](req.session.user, serviceExecution.data, function(err, data){
				serviceExecution.data = data;
				if(err)
					serviceExecution.err = err;
				
				res.end(JSON.stringify(serviceExecution));
			});
		}
		catch(e){
			delete serviceExecution.data;
			serviceExecution.err = eh.SERVICE_EXECUTION(e,serviceExecution.serviceId).err;
			res.end(JSON.stringify(serviceExecution));
		}
	});
}
function sendLog(){
	sockets.forEach(function(socket){
		socket.emit('logChange');
	});
}

//Private methods

var getData = function(req, then){
	var data = '';
	req.on('data', function(chunk){
		 data+=chunk;
	 });

	req.addListener('end',function (){
		then(JSON.parse(data));
	});
}

function addBotLog(type, message){
	timba.log.push({type:type, email: 'timbaBot@', msg:message});
}

function getPlayerIndex(email){
	var index = -1;
	for(var i = 0; i < timba.players.length; i++){
		if(timba.players[i].email == email)
			index = i;
	}
	
	return index;
}

function getBetCount(email, number){
	var betCount = 0;
	for(var i=0; i<timba.numbers.length; i++){
		var index = getPlayerIndex(timba.numbers[i].players, email);
		if(index != -1){
			betCount++;
			if(number - 1 == i)
				return 0;
		}
	}
	
	return betCount;
}

function removePlayer(email){
	var index = getPlayerIndex(timba.players, email);
	if(index != -1)
		timba.players.splice(index,1);
}

exports.logout = logout;
exports.login = login;
exports.execService = execService;
exports.redirect = redirect;
exports.getCurrentUser = getCurrentUser;
exports.forgotPassword = forgotPassword;
exports.signIn = signIn;

