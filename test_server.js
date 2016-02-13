/**
 * Created by stephenfortune on 13/02/2016.
 */

var express = require('express');
var http = require('http');

var app = express();
app.set('port', process.env.PORT || 3000);
app.get('/reset', function(req,res){
    res.status(200).send('ok\n');
    res.end();
    shutdown();
});
app.get('/', function(req,res){
    res.status(200).send('ok\n');
    res.end();
    //shutdown();
});
//
//var server = app.listen(8080, function() {
//    console.log('Listening :)');
//    server.close(function() { console.log('Doh :('); });
//});


var server = http.createServer(app);
var boot = function () {
    server.listen(app.get('port'), function(){
        console.info('Express server listening on port ' + app.get('port'));
    });
}
var shutdown = function() {
    console.log("execute??")
    server.close(function() { console.log('Doh :('); });
}

if (require.main === module) {
    boot();
} else {
    console.info('Running app as a module');
    exports.boot = boot;
    exports.shutdown = shutdown;
    exports.port = app.get('port');
}
module.exports.server = server;