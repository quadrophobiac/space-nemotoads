/**
 * Created by stephenfortune on 09/12/2015.
 */
/**
 * Created by stephenfortune on 28/11/2015.
 */
var fs = require('fs');
var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();
var CaltechPoll= require('./../caltech-poll.js');
var theFile = __dirname+'/fixtures/exo.csv';

var sinon = require('sinon');
var EventEmitter = require('events').EventEmitter;

before(function() {

    console.log("BEFORE "+fs.existsSync(theFile));

    if(fs.existsSync(theFile)){
        fs.unlink(theFile);
    }
});

    //it('should save without error', function (done) {
    //    this.timeout(0)
    //    var exoapi = new CaltechPoll();
    //    exoapi.saveCSV(theFile,done);
    //});

it.skip('should emit events on complete', function(done) {
    var spy = sinon.spy();
    var emitter = new EventEmitter();
    var exoapi = new CaltechPoll();
    done();
    console.log(Object.getOwnPropertyNames(exoapi));
    var poll = exoapi.reqObj();
    poll.on('complete', spy);

    spy.called.should.equal.true;
    done();
    //user.save(function(err) {
    //    if (err) throw err;
    //    done();
    //});
});

it.skip('should fetch data from the Caltech API', function(done){
    //this.timeout(0);
    var exoapi = new CaltechPoll();
    var a = exoapi.saveCSV(theFile, done);

    console.log("WTF");

});

it.skip('should persist API data to file', function(){
    expect(fs.existsSync(theFile).to.equal(true));
});

//it('should load and log the word', function(){
//    console.log(__dirname);
//    var exoapi = new CaltechPoll();
//    expect(exoapi.log()).to.equal("word");
//});