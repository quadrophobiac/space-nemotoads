/**
 * Created by stephenfortune on 15/12/2015.
 */

var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();
var server = require('./../exports-server.js');
var moduleServer = require('./../module-server.js');
var http = require('http');
var request = require('request');

describe('server response', function () {
    before(function () {
        moduleServer.listen(8000);
    });

    after(function () {
        moduleServer.close();
    });

    it('should return 400', function (done) {
        request.get('http://localhost:8000', function (err, res, body){
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.equal('wrong header');
            done();
        });
    });

    it('should return 200', function (done) {
        var options = {
            url: 'http://localhost:8000',
            headers: {
                'Content-Type': 'text/plain'
            }
        };
        request.get(options, function (err, res, body) {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.equal('correct header');
            done();
        });
    });

    it('should emit request body', function (done) {
        var options = {
            url: 'http://localhost:8000',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: 'successfully emitted request'
        };
        var eventFired = false;

        request.get(options, function (err, res, body) {});

        moduleServer.on('success', function (data) {
            eventFired = true;
            expect(data).to.equal('successfully emitted request');
        });

        setTimeout( function () {
            expect(eventFired).to.equal(true);
            done();
        }, 10);
    });
});

describe('main server', function(){

    before(function(){

        console.log('main server is a ');
        console.log(typeof server);
        console.log(Object.getOwnPropertyNames(server));
        server.listen(8080);

    });

    after(function(){
        server.close();
    });

    describe('/', function () {
        it('should return 200', function (done) {

            http.get('http://localhost:8080', function (res) {
                assert.equal(200, res.statusCode);
                done();
            });
        });

        it('should say "Hello, world!"', function (done) {
            http.get('http://localhost:8080', function (res) {
                var data = '';

                res.on('data', function (chunk) {
                    data += chunk;
                });

                res.on('end', function () {
                    assert.equal('Hello, world!\n', data);
                    done();
                });
            });
        });
    });

});
//
//describe('/', function () {
//    it('should return 200', function (done) {
//
//        http.get('http://localhost:8000', function (res) {
//            assert.equal(200, res.statusCode);
//            done();
//        });
//    });
//
//    it('should say "Hello, world!"', function (done) {
//        http.get('http://localhost:8000', function (res) {
//            var data = '';
//
//            res.on('data', function (chunk) {
//                data += chunk;
//            });
//
//            res.on('end', function () {
//                assert.equal('Hello, world!\n', data);
//                done();
//            });
//        });
//    });
//});