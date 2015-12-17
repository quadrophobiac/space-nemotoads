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

it('should sort KOIs by year discovered', function(){

});