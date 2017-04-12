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


/********************************************************************
************************** Config & Init ****************************
*********************************************************************/

//Sockets
var sockets = [];
io.sockets.on('connection', function(socket){
	sockets.push(socket);
	socket.emit('timbaChange',timba);
});

//Log type
var logType = {CHAT:0, LOGIN:1, LOGOUT:2, KICKED:3,TIMBA:4};

//Timba session
var timba = {
	playTime: 16,
	betAmount: 10,
	maxBetsPerPlayer : 50,
	date: new Date(),
	log: [{type:logType.TIMBA, email: 'timbaBot@', msg: 'Timba has been created successfully!'}],
	players: [
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4},
	{email:'usuario1@gmail.com', bets:4}

],
	winner: undefined,
	winnerIndex: 0,
	closed: false,
	status: 0,
	running: false
}

//Init

var timbaTime = new Date();
timbaTime.setHours(timba.playTime);
timbaTime.setMinutes(0);
timbaTime.setSeconds(0);

var firstNotifyTime = 600000; 
var lastNotifyTime = 60000; 
var initialRemainingTime = timbaTime - new Date().getTime() - firstNotifyTime - lastNotifyTime;

if(initialRemainingTime > 0)
	setTimeout(firstNotify, initialRemainingTime);


function firstNotify(){
	database.findUsers({}, function(err, users) {
		if(err)
			console.log(err);

		if(users)
			users.forEach(function(user){
				mail.send(user.email,'La timba está por comenzar', user.email + ' faltan 10 minutos para el cierre de la timba');
			});
	});
	setTimeout(lastNotify, firstNotifyTime);
}

function lastNotify(){
	database.findUsers({}, function(err, users) {
		if(err)
			console.log(err);

		if(users)
			users.forEach(function(user){
				mail.send(user.email,'Arranca la timba!', user.email + ' en exactamente un minuto arranca la timba. No te la pierdas!');
			});
	});
	setTimeout(startTimba, lastNotifyTime);
}

function startTimba(){
	timba.running = true;
	timba.closed = true;
	var finalList = [];
	for(var i=0; i<timba.players.length;i++)
		for(var j=0; j< timba.players[i].bets; j++)
			finalList.push(timba.players[i].email);
	
	if(finalList.length > 0){
		random.get(finalList.length, function(winnerIndex){
			timba.winnerIndex = getPlayerIndex(finalList[winnerIndex]);
			timba.winner = timba.players[timba.winnerIndex].email;
			addBotLog(logType.TIMBA, 'GANADOR: ' + timba.winner);
			timba.players.forEach(function(player){
				database.findUser({email:player.email}, function(err, usr) {
					if(usr){
						usr.balance -= player.bets;
						sendUser(socketsByUser[usr.email], usr);
						usr.save();
					}
				});
			});
			database.insertTimba(timba, function(err, tmb){
				if(err)
					console.log(err);
			});
			sendTimba();
		});
		
	}
	
}




/********************************************************************
***************************** Services ******************************
*********************************************************************/

var services = {
	




	
// 1.  USERS


//ADD USER
addUser : function (user, data, then){
	database.insertUser(data.user, function(err,user){
		if(err)
			then(eh.DATABASE(err),null);
		
		return then(null, '');
	});
},




//GET USER
getUser : function (user, data, then){
	database.findUserBasic({email:user.email},function(err,usr){
		if(err)
			then(eh.DATABASE(err),null);
		
		if(usr){
			
			if(!usr.balanceRequest)
				usr.balanceRequest = 0;
			
			if(!usr.balance)
				usr.balance = 0;
			
			return then(null, usr);
		}
		
		return then(null, '');
	});
},




//GET USERS
getUsers : function (user, data, then){
	database.findUsers({},function(err,users){
		if(err)
			then(eh.DATABASE(err),null);
		
		if(users)
			return then(null, users);
		
		return then(null, '[]');
	});
},








// 2.  BETS & BALANCE


//SET BET data.action = ['ADD','SUBSTRACT']
setBet : function (user, data, then){
	var i = getPlayerIndex(user.email);
	
	if(!timba.closed && i != -1){
		database.findUser({email:user.email},function(err,usr){
			if(err)
				then(eh.DATABASE(err),null);
						
			if(usr){
				if(data.action == 'ADD' && timba.players[i].bets < timba.maxBetsPerPlayer && timba.players[i].bets < usr.balance){
					timba.players[i].bets++;
					sendTimba();
				}
				else if(data.action == 'SUBSTRACT' && timba.players[i].bets > 0){
					timba.players[i].bets--;
					sendTimba();
				}
			}
			return then(null, '');
		});
	}
},

//SET BALANCE data.action = ['ADD','SUBSTRACT']
setBalance : function (user, data, then){
	if(user.admin){
		database.findUser({email:data.user.email}, function(err, usr) {
			if(!usr.balance)
				usr.balance = 0;
			
			if(data.action == 'ADD')	
				usr.balance += 1;
			
			if(data.action == 'SUBSTRACT')
				usr.balance -= 1;
			

			sendUser(socketsByUser[data.user.email], usr);
			usr.save();
		});
	}
	return then(null, '');
},

//BALANCE REQUEST 
balanceRequest : function (user, data, then){
	database.findUser({email:user.email}, function(err, usr) {
		usr.balanceRequest = data.balanceRequest;
		sendUser(data.socketId, usr);
		usr.save();
		return then(null, '');
	});
	
},


//APPROVE BALANCE
approveBalanceRequest : function (user, data, then){
	if(user.admin){
		database.findUser({email:data.user.email}, function(err, usr) {
			usr.balance += usr.balanceRequest;
			usr.balanceRequest = 0;
			sendUser(socketsByUser[data.user.email], usr);
			usr.save();
			return then(null, '');
		});
	}
},

//CANCEL BALANCE
cancelBalanceRequest : function (user, data, then){
	if(user.admin || user.email == data.user.email){
		database.findUser({email:data.user.email}, function(err, usr) {
			usr.balanceRequest = 0;
			sendUser(socketsByUser[data.user.email], usr);
			usr.save();
		});
	}
	return then(null, '');
},






// 3. Others

//get timbas 
getTimbas : function (user, data, then){
	database.findTimbas(function(err,timbas){
		if(err)
			then(err,'');

		return then(null, timbas);
	});
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

//SUGGEST
suggest : function (user, data, then){
	mail.send("jibadano@gmail.com",'Suggestion','user: ' + user.email + " suggestion: " + data.msg);
	then(null,'');
},


//SET ACTIVE FLAG
setActiveFlag : function (user, data, then){
	var i = getPlayerIndex(user.email);
	
	if(i != -1){
		timba.players[i].active = data.flag;
		sendTimba();
	}

	return then(null, '');
},


//START TIMBA
startTimba : function (user, data, then){
	startTimba();
	then(null,'');
},


//SERVICES END
}

















/********************************************************************
************************** Global Services **************************
*********************************************************************/

/*	
*								LOGIN
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
			timba.players.push({email:user.email, bets:0, active:true});
			timba.log.push({type:logType.LOGIN, email: 'timbaBot@', msg: user.email + ' connected'});
			sendTimba();
		}
		
		delete user.password;
		getData(req,function(data){
			req.session.socketId = data.socketId;
			console.log('user: ' + user.email + ' socketId: ' + data.socketId );
			socketsByUser[user.email] = data.socketId;
			req.session.user = user;
			res.end(JSON.stringify(user));
		});
	});
}
var socketsByUser = {};

/*	
*								LOGOUT
*/
function logout(req, res) {
	if(!timba.closed && ! timba.running){
		if(req.session.user){
			removePlayer(req.session.user.email);
			timba.log.push({type:logType.LOGOUT, email:'timbaBot@', msg: req.session.user.email + ' disconnected'});
			delete req.session.user;
			sendTimba();
		}
	}
	res.end('{}');
}


/*	
*							FORGOT PASSWORD
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

/*	
*								SIGN IN
*/
function signIn(req, res) {
	if(req.session.user)
		return res.end(eh.USER.ALRDY_LOGGED_IN);
	
	var enc_auth = req.headers.authorization;
	var auth = atob(enc_auth.substring(6,enc_auth.length));
	
	var email = auth.split(':')[0];
	var password = auth.split(':')[1];
	
	var usr = {email: email, password: password, firstLogin: false, admin: false};
	
	database.insertUser(usr,function(err,user){
		if(err)
			res.end(JSON.stringify(err));
		if(user){
			res.end(JSON.stringify(user));
				mail.send(user.email,'Welcome!!!!!','user: ' + user.email + ' password: ' + user.password);

		}
	});
	
}


/*	
*						GET CURRENT USER
*/
function getCurrentUser(req, res){
	getData(req,function(data){
		req.session.socketId = data.socketId;
		if(req.session.user){
			socketsByUser[req.session.user.email] = data.socketId;
			return res.end(JSON.stringify(req.session.user));
		}
		else
			return res.end('{}');
	});
}

/*	
*								REDIRECT
*/
function redirect(req, res){
	res.redirect('/');
}





/*	
*								EXEC SERVICE
*/
function execService(req, res) {
	getData(req, function(serviceExecution){
		try{
			if(!req.session.user){
				serviceExecution.err = eh.USER.SESSION_EXPIRED;
				return res.end(JSON.stringify(serviceExecution));
			}

		
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













/********************************************************************
****************************** Private ******************************
*********************************************************************/

//SOCKETS

function sendTimba(){
	sockets.forEach(function(socket){
		socket.emit('timbaChange',timba);
	});
}

function sendUser(socketId, user){
	var socket = getSocket(socketId);
	if(socket)
		socket.emit('userChange',user);
	
}

function sendLog(){
	sockets.forEach(function(socket){
		socket.emit('logChange');
	});
}

function sendTimbaStart(){
	sockets.forEach(function(socket){
		socket.emit('timbaStart', timba);
	});
}


var getData = function(req, then){
	var data = '';
	req.on('data', function(chunk){
		 data+=chunk;
	 });

	req.addListener('end',function (){
		try{
			var dataObj = JSON.parse(data);
			if(req.session.socketId && dataObj.data)
				dataObj.data.socketId = req.session.socketId;
			then(dataObj);
		}catch(e){console.log(e)};
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

function getSocket(id){
	for(var i=0; i< sockets.length; i++){
		if(sockets[i].conn.id == id)
			return sockets[i];
	}
	return null;
}


/********************************************************************
****************************** Exports ******************************
*********************************************************************/


exports.logout = logout;
exports.login = login;
exports.execService = execService;
exports.redirect = redirect;
exports.getCurrentUser = getCurrentUser;
exports.forgotPassword = forgotPassword;
exports.signIn = signIn;

