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

var logType = {CHAT:0, LOGIN:1, LOGOUT:2, KICKED:3,TIMBA:4};
var sockets = [];

var timba = {
	betAmount: 10,
	maxBetsPerPlayer : 10,
	date: new Date(),
	numbers: [],
	log: [{type:logType.TIMBA, email: 'timbaBot@', msg: 'Timba has been created successfully!'}],
	players: [],
	winners: [],
	executing: false,
	closed: false
}

io.sockets.on('connection', function(socket){
	sockets.push(socket);
	socket.emit('timbaChange',timba);
});

for(var i=0; i< 36; i++){
	timba.numbers[i] = {players:[]};
}

function redirect(req, res){
	res.redirect('/');
}

function logout(req, res) {
	if(req.session.user){
		removePlayer(req.session.user.email);
		timba.log.push({type:logType.LOGOUT, email:req.session.user.email, msg: req.session.user.email + ' disconnected'});
		delete req.session.user;
		sendTimba();
	}
	res.end('{}');
}

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
		
		if(getPlayerIndex(timba.players, email) == -1){
			timba.players.push({email:user.email});
			timba.log.push({type:logType.LOGIN, email:user.email, msg: user.email + ' connected'});
			sendTimba();
		}
		delete user.password;
		req.session.user = user;
		res.end(JSON.stringify(user));
	});
}

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



var services = {
//ADD USER
addUser : function (user, data, then){
	database.insertUser(data.user,function(err,user){
		if(err)
			then(eh.DATABASE(err),null);
		
		return then(null, '');
	});
},

//SET BET
setBet : function (user, data, then){
	var index = -1;
	for(var i = 0; i < timba.numbers[data.number -1].players.length; i++){
		if(timba.numbers[data.number - 1].players[i].email == user.email)
			index = i;
	}
	if(index != -1)
		timba.numbers[data.number -1].players.splice(index,1);
	else
		timba.numbers[data.number-1].players.push({email:user.email});
	
	sendTimba();
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
	}
	return then(undefined, {});
},

//START TIMBA
startTimba : function(user, data, then){
		if(user.admin){
			timba.executing = true;
			sendTimba();
			setTimeout(function() {
				timba.executing = false;
				
				var listaPonderada = [];
				for(var i=0; i < timba.players.length; i++){
					for(var j=0; j < timba.players[i].bets; j++)
						listaPonderada.push(timba.players[i]);
				}
				
				var number = Math.floor((Math.random() * timba.numbers.length));
				timba.winners = timba.numbers[number].players;
				sendTimba();
			},20000);
		};
	},
}


function fetchTimba(req, res){
	changes.push(res);
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

function getPlayerIndex(players, email){
	var index = -1;
	for(var i = 0; i < players.length; i++){
		if(players[i].email == email)
			index = i;
	}
	
	return index;
}

function removePlayer(email){
	for(var i =0; i < timba.numbers; i++){
		var index = getPlayerIndex(timba.numbers[i].players, email);
		if(index != -1)
			timba.numbers[i].players.splice(index,1);
	}
	
	var index = getPlayerIndex(timba.players, email);
	if(index != -1)
		timba.players.splice(index,1);
}

exports.logout = logout;
exports.login = login;
exports.execService = execService;
exports.redirect = redirect;
exports.fetchTimba = fetchTimba;
exports.getCurrentUser = getCurrentUser;

