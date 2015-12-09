/**
 * Created by stephenfortune on 09/12/2015.
 */
'use strict'
var util = require('util');
var restclient = require('restler');
var xml2js = require('xml2js');
var fs = require('fs');
var CSV = require('csv-string');

function CaltechPoll(){}

CaltechPoll.prototype.log = function(){
    return "word";
}

restclient.get('http://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_name,pl_rade,pl_bmasse,pl_disc&where=pl_rade%3C2.0&format=csv')
    .on('success', function(result, response){
        console.log(typeof result);
        var arr = CSV.parse(result);
        console.log(arr);

        fs.writeFile(__dirname+'/exo.csv', result, 'utf8');


    })
    .on('complete', function(data){
        //console.log(JSON.stringify(data, null, 4));
        // console.log(data[1]);

        // console.log(Object.getOwnPropertyNames(data));
    })
    .on('error', function(result,response){
        console.log("error occurred: ");
        console.log(response);

    });

module.exports = CaltechPoll;