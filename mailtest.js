'use strict';
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '71mb4.noreply@gmail.com',
        pass: 'Opus9no2'
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"Fred Foo ??" <foo@blurdybloop.com>', // sender address
    to: 'jibadano@gmail.com', // list of receivers
    subject: 'Hello ?', // Subject line
    text: 'Hello world ?', // plain text body
    html: `
	<html class=" js flexbox flexboxlegacy canvas canvastext webgl no-touch geolocation postmessage websqldatabase indexeddb hashchange history draganddrop websockets rgba hsla multiplebgs backgroundsize borderimage borderradius boxshadow textshadow opacity cssanimations csscolumns cssgradients cssreflections csstransforms csstransforms3d csstransitions fontface generatedcontent video audio localstorage sessionstorage webworkers applicationcache svg inlinesvg smil svgclippaths"><head>    
	<script>document.write('<base href="' + document.location + '" />');</script><base href="http://localhost:8080/#">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="description" content="Flatfy Free Flat and Responsive HTML5 Template ">
    <meta name="author" content="">

    <title>71mb4</title>

    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
 
    <!-- Custom Google Web Font -->
    <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <link href="http://fonts.googleapis.com/css?family=Lato:100,300,400,700,900,100italic,300italic,400italic,700italic,900italic" rel="stylesheet" type="text/css">
	<link href="http://fonts.googleapis.com/css?family=Arvo:400,700" rel="stylesheet" type="text/css">
	
    <!-- Custom CSS-->
    <link href="css/general.css" rel="stylesheet">
	
	 <!-- Owl-Carousel -->
    <link href="css/custom.css" rel="stylesheet">
	<link href="css/owl.carousel.css" rel="stylesheet">
    <link href="css/owl.theme.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<link href="css/animate.css" rel="stylesheet">
	
	<!-- Magnific Popup core CSS file -->
	<link rel="stylesheet" href="css/magnific-popup.css"> 
	<script src="http://localhost:4000/socket.io/socket.io.js"></script>
	<script src="node_modules/core-js/client/shim.min.js"></script>
    <script src="node_modules/zone.js/dist/zone.js"></script>
    <script src="node_modules/reflect-metadata/Reflect.js"></script>
    <script src="node_modules/systemjs/dist/system.src.js"></script>

	<script src="js/modernizr-2.8.3.min.js"></script>  <!-- Modernizr /-->
	<script src="systemjs.config.js"></script>
    <script>
      System.import('app').catch(function(err){ console.error(err);});
    </script>

<style>.intro-header[_ngcontent-usc-1]:before{

}

.bg-blur[_ngcontent-usc-1]{
    filter:blur(6px);
}

.timba-modal[_ngcontent-usc-1]{
	    width: 76%;
    height: 76%;
    position: fixed;
    display: block;
    background: transparent;
    left: 12%;
    top: 12%;
    z-index: 9999999;
     overflow-y: auto;
}

.modal-content[_ngcontent-usc-1]{
    border-radius: 0;
    padding-top:0;
    padding-bottom:50px;
    padding-left:30px;
    padding-right:30px;
    background-color: rgba(200,200,200,0.7);
}</style><style>#roulette[_ngcontent-usc-3]{
    position: absolute;
    z-index: 99999999;
    transform: rotate(360deg);
    width: 400px;
    height: 400px;
    left: calc(50% - 200px);
    top: calc(50% - 200px);
    background: transparent;
}

.nedle[_ngcontent-usc-3]{
        position: absolute;
    left: calc(50% + 130px);
    top: calc(50% - 8px);
    z-index: 999999999999999999999;
    color:#fff;
}</style></head>

<body id="home" style="overflow: visible;">
	
	<my-app _nghost-usc-1=""><!--template bindings={
  "ng-reflect-ng-if": "false"
}-->

<!--template bindings={
  "ng-reflect-ng-if": "false"
}-->

<!--template bindings={
  "ng-reflect-ng-if": "false"
}-->

<div _ngcontent-usc-1="" class="intro-header">
	<!--template bindings={
  "ng-reflect-ng-if": "true"
}--><home _ngcontent-usc-1="">

	<div class="col-xs-4 col-xs-offset-4 text-center abcen1">
		<h1 class="h1_home wow fadeIn" data-wow-delay="0.4s">71mb4</h1>
		<!--template bindings={
  "ng-reflect-ng-if": "true"
}--><div>
			<h3 class="h3_home wow fadeIn" data-wow-delay="0.6s">La timba se cerró en breve pasará el recaudador!</h3>
			
		</div>

		<!--template bindings={
  "ng-reflect-ng-if": "false"
}-->
		<!--template bindings={
  "ng-reflect-ng-if": "false"
}-->
	</div>    
</home>
	<!--template bindings={
  "ng-reflect-ng-if": null
}-->
</div></my-app>

    <!-- JavaScript -->
    <script src="js/jquery-1.10.2.js"></script>
    <script src="js/bootstrap.js"></script>
	<script src="js/owl.carousel.js"></script>
	<script src="js/script.js"></script>
	<!-- StikyMenu -->
	<script src="js/stickUp.min.js"></script>
	<script type="text/javascript">
	  jQuery(function($) {
		$(document).ready( function() {
		  $('.navbar-default').stickUp();
		  
		});
	  });
	
	</script>
	<!-- Smoothscroll -->
	<script type="text/javascript" src="js/jquery.corner.js"></script> 
	<script src="js/wow.min.js"></script>
	<script>
	 new WOW().init();
	</script>
	<script src="js/classie.js"></script>
	<script src="js/uiMorphingButton_inflow.js"></script>
	<!-- Magnific Popup core JS file -->
	<script src="js/jquery.magnific-popup.js"></script> 



</body></html>
`	
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});