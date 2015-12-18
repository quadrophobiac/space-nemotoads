/**
 * Created by stephenfortune on 17/12/2015.
 */
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();
var simpleServer = require('./../arduino_server.js');
var socketServer = require('./../socket-server.js');
var http = require('http');
var request = require('request');
var supertest = require("supertest");
var server = supertest.agent("http://localhost:3000");

describe('socket server', function(){

    it("should add two number",function(done){

        //calling ADD api
        server
            .post('/add')
            .send({num1 : 10, num2 : 20})
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                res.body.error.should.equal(false);
                res.body.data.should.equal(30);
                done();
            });
    });

})

describe('server response', function () {
    before(function (done) {
        simpleServer.listen(8000);
        done();
    });

    after(function () {
        simpleServer.close();
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
    //
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

        simpleServer .on('success', function (data) {
            eventFired = true;
            expect(data).to.equal('successfully emitted request');
        });

        setTimeout( function () {
            expect(eventFired).to.equal(true);
            done();
        }, 10);
    });
});