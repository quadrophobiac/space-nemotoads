/**
 * Created by stephenfortune on 13/02/2016.
 */
var requestretry = require('requestretry');
var req = require('request');

//req('http://localhost:3000/start', function(err,res,body){
//    console.log(res.statusCode);
//});

requestretry({
    url: 'http://localhost:3000/reset',
    //json:true,
    // The below parameters are specific to request-retry
    maxAttempts: 20,   // (default) try 5 times
    retryDelay: 4000,  // (default) wait for 5s before trying again
    retryStrategy: request.RetryStrategies.HTTPOrNetworkError // (default) retry on 5xx or network errors
}, function(err, response, body){
    // this callback will only be called when the request succeeded or after maxAttempts or on error
    if (response) {
        console.log('The number of request attempts: ' + response.attempts);
    }
});