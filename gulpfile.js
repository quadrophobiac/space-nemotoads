'use strict';

var gulp = require('gulp');
var open = require('gulp-open');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
//var browserify 	= require('gulp-browserify');
var source = require('vinyl-source-stream');
var request = require('request');

var CROSS_SERVER_REQUEST_DELAY = 500;

gulp.task('default', ['browser-sync'], function () {
	//setTimeout(function defaultpause() {ping();},500);
}); // browsersync wont play nice with linux

gulp.task('browser-sync', ['nodemon'], function() {
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

gulp.task('nodemon', function (cb) {

	var started = false;

	return nodemon({
		script: 'server.js'
		, ext: 'js html'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		console.log('nodemon has started');
		if (!started) {
			console.log("triggering callback from 'start only once'");
			cb();
			started = true;
		}
	}).on('restart', function () {
		setTimeout(function reload() {
			ping();
			browserSync.reload({
				stream: false
			});
		}, CROSS_SERVER_REQUEST_DELAY);
	});
});

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