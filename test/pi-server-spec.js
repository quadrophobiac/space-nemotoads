'use strict';
// following this http://glebbahmutov.com/blog/how-to-correctly-unit-test-express-server/
var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();
var request = require('supertest');
//var server = require('./../server.js');

describe('server', function(){
    var server;
    beforeEach(function(){
        delete require.cache[require.resolve('./../server.js')];
        server = require('./../server.js');
    });

    //after('close server', function(done){
    //    server.close(done);
    //});

    afterEach('destroy server instance', function(done){
        server.close(done);
    });

    it.skip('should start and listen on port ENV:????', function(){

        // assert - code that verifies actually working
        // assert - changes have been made to log file

    });

    it('serves static page on $HOST:$PORT/index.html', function(done){
        request(server).get('/').expect(200, done);

    });

    it('serves logs to static page on ', function(){

    })

    it('404 all other requests', function(done){
       request(server).get('/nope').expect(404, done);
    });

    it.skip('catchs erroneous access without crashing', function(){

    });

});

describe.skip('boot sequence', function(){
    var server;

    before(function(){
        delete require.cache[require.resolve('./../server.js')];
        server = require('./../server.js');
    });

    beforeEach(function(){

    });
    //
    afterEach('log files should have changed', function(){

    });

    after('close server', function(done){
        server.close(done);
    });

    it('reads from local exo db file', function(){

    });

    it('starts the arduino', function(){

    });

    it('passes parameters to the arduino', function(){

        // read current state of initialised motors
        // pass params
        //

    });


});