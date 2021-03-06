/*
 * 	Router 0.0.1
 *
 *	jibadano@gmail.com
 *	Date: 2015-11-24
 */

function init(app,requestHandler){
	
	app.all('/home',requestHandler.redirect );
	app.all('/dashboard',requestHandler.redirect );
	app.post('/login', requestHandler.login);
	app.post('/logout', requestHandler.logout);
	app.post('/services', requestHandler.execService);
	app.post('/getCurrentUser',requestHandler.getCurrentUser );
	app.post('/forgotPassword',requestHandler.forgotPassword );
	app.post('/signIn',requestHandler.signIn );

}

exports.init = init;
