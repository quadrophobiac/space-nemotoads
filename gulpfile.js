'use strict';

var gulp = require('gulp');
var open = require('gulp-open');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
//var browserify 	= require('gulp-browserify');
var source = require('vinyl-source-stream');
var request = require('request');

gulp.task('default', ['browser-sync'], function () {
}); // browsersync wont play nice with linux

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
			proxy: "http://localhost:5000",
        //files: ["client/data/*.*"],
		files: ["fixtures/*.json"],
        //browser: "firefox",
		browser: process.platform === 'darwin' ? 'firefox' : 'chromium',
        port: 7000,
	});
}); // browsersync wont play nice with linux


// graceful fallback
//gulp.task('default', ['uri'], function () {
//});
//
//gulp.task('uri', ['nodemon'], function(){
//	gulp.src('')
//		.pipe(open({uri: 'http://localhost:5000/'}));
//});

gulp.task('nodemon', function (cb) {

	var started = false;

	return nodemon({
		script: 'server.js'
		, ext: 'js html json'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true;
		}
	}).on('restart', function () {
		setTimeout(function () {
			ping();
		}, 2000);
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
		//console.log(body); // Show the HTML for the Modulus homepage.
	} else {
		console.log("fail");
		console.log(error.stack);
	}
}