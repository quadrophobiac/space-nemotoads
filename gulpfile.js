'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var browserify 	= require('gulp-browserify');
var source = require('vinyl-source-stream');

gulp.task('default', ['browser-sync'], function () {
});


gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
			proxy: "http://localhost:5000",
        //files: ["client/data/*.*"],
		files: ["fixtures/*.json"],
        browser: "google chrome",
        port: 7000,
	});
});
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
	});
});
