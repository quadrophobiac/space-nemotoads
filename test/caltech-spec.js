/**
 * Created by stephenfortune on 09/12/2015.
 */
/**
 * Created by stephenfortune on 28/11/2015.
 */
var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();
var CaltechPoll= require('./../caltech-poll.js');

it('should load and log the word', function(){
    var exoapi = new CaltechPoll();
    expect(exoapi.log()).to.equal("word");
});
