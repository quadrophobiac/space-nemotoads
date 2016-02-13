/**
 * Created by stephenfortune on 13/02/2016.
 */
var planetdata = require('./fixtures/earthSized.json');
var arduino = require('./arduino_master');
var topthree = require('./lib/uniform');
var express = require('express');




var app = module.exports.app = exports.app = express();