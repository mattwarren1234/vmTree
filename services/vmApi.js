var request = require('request');
var wsse = require('wsse')();
var http = require('http');
var qs = require('querystring');
var sha256 = require('sha256');
var btoa = require('btoa');
var privateKey = require('./privateKey');

var helloWorld = function(){
  var request = require('request');
  return new Promise(function(resolve, reject){
    var url = "http://www.volunteermatch.org/api/call?action=helloWorld&key=4dfbf57a80fc42d72f76f8759d052e85&query=%7B%22name%22:%22VolunteerMatch%22%7D";
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
   });
  // var authString = createDigest(); 
  // var action = 'getKeyStatus';
  // var staticAction = "?action="+action+"";
  // var staticQuery = "&query=%7B%22name%22:%22VolunteerMatch%22%7D"; //copied from an example
  // var staticKey = "&key=4dfbf57a80fc42d72f76f8759d052e85";
  // var url = "http://www.volunteermatch.org/api/call";
  // url += staticAction;
  // url += staticQuery;
  // url += staticKey;
  // return new Promise(function(resolve, reject){
  //   var callback = function(error, response, body){
  //     resolve(body);
  //   };
  //   var options = {
  //   url: url
  // };
  //   request(options, callback);
  // });

};

exports.helloWorld = helloWorld;
