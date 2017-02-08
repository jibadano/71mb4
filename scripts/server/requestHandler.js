/*
 * 	Request Handler 0.0.1
 *
 *	jibadano@gmail.com
 *	Date: 2015-11-24
 */

var database = require('./database');
var eh = require('./errorHandler');
var atob = require('atob');
var io = require('socket.io').listen(4000);
io.sockets.on('connection', function(socket){
	sockets.push(socket);
	socket.emit('timbaChange',timba);
});

var logType = {CHAT:0, LOGIN:1, LOGOUT:2, KICKED:3,TIMBA:4};
var sockets = [];

//Timba session
var timba = {
	betAmount: 10,
	maxBetsPerPlayer : 10,
	date: new Date(),
	log: [{type:logType.TIMBA, email: 'timbaBot@', msg: 'Timba has been created successfully!'}],
	players: [
	{email:'user1@gmail.com', bets:1},
	{email:'user2@gmail.com', bets:2},
	{email:'user3@gmail.com', bets:3},
	{email:'user4@gmail.com', bets:4},
	{email:'user5@gmail.com', bets:5},
	{email:'user6@gmail.com', bets:6},
	{email:'user7@gmail.com', bets:7}
	],
	winner: {},
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
		timbaStart();
	
	
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

function timbaStart(){
	sockets.forEach(function(socket){
		socket.emit('timbaStart', timba);
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

