'use strict'

var restclient = require('restler');
var fs = require('fs');
var CSV = require('csv-string');
var jsoncsv = require('json-2-csv');

var queries = {
    earthSized: 'http://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_name,pl_rade,pl_bmasse,pl_disc,rowupdate&where=pl_rade%3C2.0&format=csv',
    allKOIs: 'http://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=cumulative&select=kepler_name,koi_disposition,koi_vet_stat,koi_datalink_dvs,koi_vet_date&format=csv',
    allExoplanets: 'http://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_name,pl_rade,pl_bmasse,pl_disc,rowupdate&format=csv'
}

var queriesArr = ['earthSized', 'allKOIs', 'allExoplanets'];

var headers;


function getDateTime() {

    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return year + "-" + month + "-" + day + "-" + hour;
}

var CSVtoObject = function(string){
    var arrArr = CSV.parse(string); // array of objects
    headers = arrArr.shift(); // headers is an object

    var toCSV = new Array();

    arrArr.forEach(function(ele,index,context){

        var i0 = headers["0"].toString();
        var i1 = headers["1"].toString();
        var i2 = headers["2"].toString();
        var i3 = headers["3"].toString();
        var i4 = headers["4"].toString();
        var variety = {};
        variety[i0] = ele["0"];
        variety[i1] = ele["1"];
        variety[i2] = ele["2"];
        variety[i3] = ele["3"];
        variety[i4] = ele["4"];

        toCSV.push(variety);
    });

    return toCSV;
}

var json2csvCallback = function (err, csv) {
    if (err) throw err;
    //console.log(query);

}


var difflog = function(query,oldJSON,newJSON){

    var newEntryCount = newJSON.length - oldJSON.length;
    var newEntries = [];
    for(var i=0;i< newEntryCount;i++){
        var popped = 1+i;
        //console.log()
        var added = newJSON[newJSON.length-popped];
        newEntries.push(JSON.stringify(added));
    }

    var logfile = __dirname+'/data_tracking.log';
    console.log(newEntries.toString());
    fs.appendFileSync(logfile, "new entries:\n", 'utf8');
    fs.appendFileSync(logfile, newEntries.toString(), 'utf8');

    console.log("lets diff files");


}

var datacompare = function(query, apiJSON,lastStoredData){
    var logfile = __dirname+'/data_tracking.log';
    //console.log(logfile);
    var compare = fs.readFileSync(lastStoredData,'utf8');
    var tmpJSON = JSON.parse(compare);
    var newData = apiJSON.length !== tmpJSON.length;
    //data,last_record,current_record,date_of_poll
    var logdata = query+","+tmpJSON.length+","+apiJSON.length+","+getDateTime()+","+newData+"\n";
    //fs.appendFileSync(logfile, getDateTime()+"comparison of "+query+" data: last recorded = "+tmpJSON.length+" versus current data = "+apiJSON.length+"\n", 'utf8');
    fs.appendFileSync(logfile, logdata, 'utf8');
    console.log("comparison of "+query+" data: last recorded = "+tmpJSON.length+" versus current data = "+apiJSON.length);
    console.log( (apiJSON.length > tmpJSON.length) );
    if(newData){difflog(query,tmpJSON, apiJSON)}
    return newData;
}

var filemgmt = function(query, apiData,tmpJSONPath,csvPath,jsonPath){
    var json = CSVtoObject(apiData);
    json.sort(function (c,d) {
        if (c.pl_disc == d.pl_disc) {
            //console.log("equal years");
            if(Date.parse(c.rowupdate) > Date.parse(d.rowupdate)){
                //console.log("years disc: "+ c.pl_disc+" more recently updated than years disc: "+ d.pl_disc);
                return 1;
            }else if (Date.parse(d.rowupdate) > Date.parse(c.rowupdate)){
                //console.log("years disc: "+ d.pl_disc+" more recently updated than years disc: "+ c.pl_disc);
                return -1;
            }
        }
        if (c.pl_disc > d.pl_disc) {
            return 1;
        }
        if (c.pl_disc < d.pl_disc) {
            return -1;
        }

        // a must be equal to b
        return 0;
    });

    if(datacompare(query,json,tmpJSONPath)){

        // TODO, function to transform data in place to have a gravity reading built into data

        fs.writeFileSync(jsonPath, JSON.stringify(json,null,4), 'utf8');
        fs.writeFileSync(tmpJSONPath, JSON.stringify(json,null,4), 'utf8');
        //console.log("********************************\n"+typeof jsoncsv.json2csv(json, json2csvCallback));
        //console.log("saving "+query+" to "+csvPath);
        jsoncsv.json2csv(json, function (err, csv) {
            if (err) throw err;
            console.log("in callback, saving to "+csvPath);
            fs.writeFileSync(csvPath, csv, 'utf8');
        });
    }
}
var saveCSV = function(query, callback){

    // query is derived from queries object, writefile designed to control whether files are written to disk
    var jsonPath = __dirname+"/fixtures/"+query+".json";
    var csvPath = __dirname+"/fixtures/"+query+".csv";
    var tmpCSVPath = __dirname+"/tmp/"+query+".csv";
    var tmpJSONPath = __dirname+"/tmp/"+query+".json";


    restclient.get(queries[query])
        .on('success', function(result, response){
            console.log("saving "+query+" API csv to "+tmpCSVPath);
            fs.writeFileSync(tmpCSVPath, result, 'utf8'); // store CSV from which JSON objs derived
            filemgmt(query, result,tmpJSONPath, csvPath,jsonPath);
            //callback(query, result,tmpJSONPath, csvPath,jsonPath);
        })
        .on('complete', function(result, response){
            console.log("completed call");
            return true;
        })
        .on('error', function(err,response){
            console.log("error");
            console.log(err);
        });
}

queriesArr.forEach(function(ele){
    saveCSV(ele, filemgmt);

});
