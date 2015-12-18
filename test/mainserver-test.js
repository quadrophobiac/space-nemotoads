/**
 * Created by stephenfortune on 15/12/2015.
 */

var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();
var server = require('./../exports-server.js');
var CentrifugeServer = require('./../named-object-exports-server.js');
var http = require('http');


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