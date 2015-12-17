/**
 * Created by stephenfortune on 09/12/2015.
 */
'use strict'
var restclient = require('restler');
var fs = require('fs');
var CSV = require('csv-string');

function CaltechPoll(){}

var queries = {
    earthSized: 'http://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_name,pl_rade,pl_bmasse,pl_disc&where=pl_rade%3C2.0&format=csv',
    allKOIs: '',
    allExoplanets: ''
};

CaltechPoll.prototype.log = function(){
    return "word";
}
CaltechPoll.prototype.reqObj = function(){
    return restclient.request('http://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_name,pl_rade,pl_bmasse,pl_disc&where=pl_rade%3C2.0&format=csv',
        {
            accept: '*/*',
            'user-agent': 'Restler for node.js',
            host: 'exoplanetarchive.ipac.caltech.edu',
            'accept-encoding': 'gzip, deflate',
            'content-length': 0
        });
}

CaltechPoll.prototype.saveCSV = function(query,path){

    if(path === void 0 ){
        path = __dirname+'/exo.csv';
    }

    restclient.get('http://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_name,pl_rade,pl_bmasse,pl_disc&where=pl_rade%3C2.0&format=csv')
        .on('success', function(result, response){
            console.log("saving to "+path);
            fs.writeFileSync(path, result, 'utf8');
            var json = orderedObject(result);
            console.log(json);
            var unorderedJSON = __dirname+'/rough_exo.json';
            var unorderedJSON = __dirname+'/descending_exo.json';
            fs.writeFileSync(unorderedJSON, json, 'utf8');
            var orderedJSON = __dirname+'/rough_exo.json';
            json.sort(function (c,d) {
                if (c.pl_disc > d.pl_disc) {
                    return 1;
                }
                if (c.pl_disc < d.pl_disc) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });
            fs.writeFileSync(orderedJSON, json, 'utf8');
            console.log(json);

        })
        .on('complete', function(result, response){

            console.log("completed call");
            return true;
        })
        .on('error', function(result,response){
            console.log("error");

        });
}

var orderedObject = function(string){
    var arrArr = CSV.parse(string);
    var headers = arrArr.shift();
    console.log(Object.getOwnPropertyNames(headers));
    console.log(headers["0"]);
    var toCSV = [];
    arrArr.forEach(function(ele,index,context){

        var i0 = headers["0"].toString();
        var i1 = headers["1"].toString();
        var i2 = headers["2"].toString();
        var i3 = headers["3"].toString();
        var variety = {};
        variety[i0] = ele["0"];
        variety[i1] = ele["1"];
        variety[i2] = ele["2"];
        variety[i3] = ele["3"];
        toCSV.push(variety);
    });
    return toCSV;
}
var formatKey  = function(key){
    return key.toString();
}

module.exports = CaltechPoll;