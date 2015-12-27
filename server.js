/**
 * Created by stephenfortune on 27/12/2015.
 */
var express = require('express');
var app = express();
//var port = 3000;
app.get('/', function(req,res){
    res.status(200).send('ok\n');
});
var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log('server listening at port %s', port);
});
module.exports = server;