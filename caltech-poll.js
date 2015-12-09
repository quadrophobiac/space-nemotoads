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
CaltechPoll.prototype.reqObj = function(){
    CaltechPoll.prototype.store = restclient.request('http://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_name,pl_rade,pl_bmasse,pl_disc&where=pl_rade%3C2.0&format=csv',
        {
            accept: '*/*',
            'user-agent': 'Restler for node.js',
            host: 'exoplanetarchive.ipac.caltech.edu',
            'accept-encoding': 'gzip, deflate',
            'content-length': 0
        });
}

CaltechPoll.store.on('complete', function(){
    var path = __dirname+'/exo.csv';
})


CaltechPoll.prototype.saveCSV = function(path){
    console.log(path === void 0);
    //path === void 0 ? path : __dirname+'exo.csv'
    //path === void 0 ? __dirname+'exo.csv' : path
    if(path === void 0 ){
        path = __dirname+'/exo.csv';
    }
    console.log("in csv function");
    console.log(__dirname);
    console.log(path);
    restclient.get('http://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_name,pl_rade,pl_bmasse,pl_disc&where=pl_rade%3C2.0&format=csv')
    //restclient.request    ('http://.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_name,pl_rade,pl_bmasse,pl_disc&where=pl_rade%3C2.0&format=csv')
        .on('success', function(result, response){
            //console.log(typeof result);
            console.log(response.statusCode);
            var arr = CSV.parse(result);
            console.log(arr[0]);

            fs.writeFileSync(path, result, 'utf8');
            CaltechPoll.savedFile = path;
            return(response.statusCode);

        })
        .on('complete', function(result, response){
            console.log(response);
            console.log("completed call");
            return true;
            //console.log(JSON.stringify(data, null, 4));
            // console.log(data[1]);

            // console.log(Object.getOwnPropertyNames(data));
        })
        .on('error', function(result,response){
            console.log("err"+result.errno+" the type "+Object.getOwnPropertyNames(result));
            console.log(result.stack+","+result.message+","+result.code+""+result.errno+""+result.syscall+""+result.hostname+""+result.host+""+result.port)

        });

}

//restclient.get('http://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_name,pl_rade,pl_bmasse,pl_disc&where=pl_rade%3C2.0&format=csv')
//    .on('success', function(result, response){
//        console.log(typeof result);
//        var arr = CSV.parse(result);
//        console.log(arr);
//
//        fs.writeFile(__dirname+'/exo.csv', result, 'utf8');
//
//
//    })
//    .on('complete', function(data){
//        //console.log(JSON.stringify(data, null, 4));
//        // console.log(data[1]);
//
//        // console.log(Object.getOwnPropertyNames(data));
//    })
//    .on('error', function(result,response){
//        console.log("error occurred: ");
//        console.log(response);
//
//    });

module.exports = CaltechPoll;