/*
 * 	Database 0.0.1
 *
 *	jibadano@gmail.com
 *	Date: 2015-11-24
 */

/*	Global	*/
var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

mongoose.connect('mongodb://localhost/database');

/*	Schemas	*/
var timbaSchema = new mongoose.Schema({
	winner: String,
	date: Date,
	numbers: [{players:[{email:String}]}],
	players: [{email: String}]
});

var userSchema = new mongoose.Schema({
	email: {type:String, required:true, unique:true},
	password: {type:String, required:true},
	firstname: String,
	lastname: String,
	admin: Boolean,
	firstLogin: Boolean
});

/*	Models	*/
var Timba = mongoose.model('Timba', timbaSchema);
var User = mongoose.model('User', userSchema);


/* Methods */
//INSERT

function insertUser(user, then){
	new User(user).save(then);
}

function insertTimba(timba, then){
	new Timba(timba).save(then);
}


//REMOVE

function removeUser(user, then){
	User.findOneAndRemove(user,then);
}

//UPDATE 

function updateUser(user, then){
	var id = user._id;
	delete user._id;
	User.findOneAndUpdate({_id: id},user,
	function(err, userUpdated){
		then(err, userUpdated != null);
	});
}

//EXISTS

function existsUser(user, then){
	User.findOne(user).
	select('email').
	exec(function(err, userFound){
		then(err, userFound != null);
	});
}

//FIND ONE

function findUser(user, then){
	User.findOne(user).
	populate('groups.friends').
	exec(then);
}

//FIND

function findUsers(user, then){
	User.find(user).exec(then);
}

function findAllTimbas(then){
	Timba.find().exec(then);
}

//OTHERS

function findUserBasic(user, then){
	User.findOne(user).
	select('_id email').
	exec(then);
}




/* Exports */

//User
exports.findUserBasic = findUserBasic;
exports.existsUser = existsUser;
exports.insertUser = insertUser;
exports.findUser = findUser;
exports.findUsers = findUsers;
exports.updateUser = updateUser;
