'use strict';

var gulp = require('gulp');
var open = require('gulp-open');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var server = require('gulp-express');
var gls = require('gulp-live-server');
//var browserify 	= require('gulp-browserify');
var source = require('vinyl-source-stream');
var request = require('request');
var requestretry = require('requestretry');
var supervisor = require( "gulp-supervisor" );
var shell = require('gulp-shell');

var CROSS_SERVER_REQUEST_DELAY = 500;

gulp.task('default', ['supervisor-simple','browser-sync'], function () {
	//setTimeout(function defaultpause() {ping();},500);
}); // browsersync wont play nice with linux


gulp.task( "supervisor-simple", function() {
	supervisor( "arduino_server.js",{
		args: [],
		watch: [ "fixtures/earthSized.json" ]
	} );
} );

// gulp express serving
// doesn't appear to restart server on the terms of the exported module

//gulp.task('server', function () {
//	console.log('running gulp server');
	// Start the server at the beginning of the task
	//server.run(['wtf.js']);
	//gulp.watch(["fixtures/*.json"], function miniBoot() {
	//	server.stop();
	//	console.log("notify server");
	//	server.run();
	//});
//});

// gulp live server

//gulp.task('server', function() {
//	//1. gls is the base for `static` and `new`
//
//
//	//3. customize livereload server, e.g. port number
//	var server = gls('arduino_server.js', undefined, false);
//	console.log(Object.getOwnPropertyNames(server));
//	console.log(server	);
//	//var promise = server.start();
//	//optionally handle the server process exiting
//	//promise.then(function(result) {
//	//	//log, exit, re-start, etc...
//	//	console.log("closing promise resolved");
//	//
//	//	server.start();
//    //
//	//});
//	//gulp.watch(["fixtures/*.json"], function miniBoot() {
//	//	server.stop();
//	//	console.log("server stopped");
//	//});
//
//});

gulp.task('browser-sync', ['main-nodemon'], function() {
	console.log('booting browser sync');

	browserSync({

		// informs browser-sync to proxy our expressjs app which would run at the following location
		proxy: "http://localhost:5000",
		files: ["fixtures/*.json"],
		// informs browser-sync to use the following port for the proxied app
		// notice that the default port is 3000, which would clash with our expressjs
		port: 7000,

		// open the proxied app in chrome
		browser: "firefox"
	});
}); // browsersync wont play nice with linux


gulp.task('main-nodemon', function (cb) {

	var started = false;

	return nodemon({
		script: 'server.js'
		, ext: 'js html json'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		console.log('main nodemon has started');
		if (!started) {
			console.log("triggering callback from 'start only once'");
			cb();
			started = true;
		}
	})
	.on('restart', function () {
		setTimeout(function reload() {
			browserSync.reload({
				stream: false
			});
		}, CROSS_SERVER_REQUEST_DELAY);
		retryping();
	}).once('quit', function () {
		process.exit()
	});
	//.on('restart',function(){
	//	retryping();
	//	bload();
	//	shell.task("node wtf.js");
	//	console.log("all tasks done");
    //
	//});
});

var bload = function(){
	setTimeout(function reload() {

		browserSync.reload({
			stream: false
		});
		//ping();

	}, CROSS_SERVER_REQUEST_DELAY);
}

var retryping = function(){
	console.log('ping the endpoint');
	requestretry({
		url: 'http://localhost:3000/reset',
		//json:true,
		// The below parameters are specific to request-retry
		maxAttempts: 20,   // (default) try 5 times
		retryDelay: 4000,  // (default) wait for 5s before trying again
		retryStrategy: requestretry.RetryStrategies.HTTPOrNetworkError // (default) retry on 5xx or network errors
	}, function(err, response, body){
		// this callback will only be called when the request succeeded or after maxAttempts or on error
		if (response) {
			console.log('The number of request attempts: ' + response.attempts);
		}
	});
	console.log('pings over');
}

gulp.task('breload', function(){
	setTimeout(function reload() {

		browserSync.reload({
			stream: false
		});
		//ping();

	}, CROSS_SERVER_REQUEST_DELAY);
})

gulp.task('retry', function(){
	console.log('ping the endpoint');
	requestretry({
		url: 'http://localhost:3000/reset',
		//json:true,
		// The below parameters are specific to request-retry
		maxAttempts: 20,   // (default) try 5 times
		retryDelay: 4000,  // (default) wait for 5s before trying again
		retryStrategy: request.RetryStrategies.HTTPOrNetworkError // (default) retry on 5xx or network errors
	}, function(err, response, body){
		// this callback will only be called when the request succeeded or after maxAttempts or on error
		if (response) {
			console.log('The number of request attempts: ' + response.attempts);
		}
	});
	console.log('pings over');
})

var ping = function(){
	console.log("pinging");
	request('http://localhost:5000/planets',reqcb);
}

var reqcb = function(error, response, body){
	console.log("requesting");
	if (!error && response.statusCode == 200) {
		console.log("success");
		if(response){console.log(response.statusCode);}
		//if(body){console.log(body);}
		//console.log(body); // Show the HTML for the Modulus homepage.
	} else {
		console.log("fail");
		console.log(error.stack);
		if(response){console.log(response.statusCode);}
		//if(body){console.log(body);}
		//console.log(body);
	}
}