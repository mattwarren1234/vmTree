var request = require('request');
var wsse = require('wsse')();
var http = require('http');
var qs = require('querystring');
var sha256 = require('sha256');
var btoa = require('btoa');
var privateKey = require('./privateKey');
'use strict';

var buildQuery = function(action, searchOptions){
  var baseUrl = "http://www.volunteermatch.org/api/call";
  var querystring = qs.stringify({
    action : action,
    key : privateKey.key,
    query : encodeURI(JSON.stringify(searchOptions))
  });
  return baseUrl + '?' + querystring;
};

var searchOrganizations = function(criteria){
  var action = "searchOrganizations";
  var searchOptions = criteria;
  var options = buildQuery(action, searchOptions);
  return new Promise(function (resolve, reject) { 
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(body); 
      } else {
        reject(error);
      }
    });
  });
};

var getCategories = function(){
  // http://www.volunteermatch.org/api/call?action=getMetadata
  var action = "getMetaData";
  var queryOptions = {version : 1};
  var options = buildQuery(action, queryOptions);
  return new Promise(function (resolve, reject) {
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(body); 
      } else {
        reject(error);
      }
    });
  });
};

var helloWorld = function(){
  var request = require('request');
  return new Promise(function(resolve, reject){
  var queryParams = {
    name: "test"
  };
  var action= 'helloWorld'; 
  var options = buildQuery(action, queryParams);
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      resolve(body); 
    } else {
      reject(error);
    }
    });
  });
};

exports.getCategories = getCategories;
exports.buildQuery = buildQuery;
exports.searchOrganizations = searchOrganizations;
exports.helloWorld = helloWorld;
