'use strict';
var express = require('express');
var request = require('request');
var router = express.Router();
var vmApi = require('../services/vmApi');

router.get('/searchOrganizations', function(req, res){
  // req.params.criteria
  // return vmApi.searchOrganizations();
  var criteria = req.params.criteria;
  vmApi.searchOrganizations(criteria)
    .then(function(data){
      res.send(data);
    });
});

router.get('/categories', function(req, res){
  vmApi.getCategories()
    .then(function(data){
      res.send(data);
    });
});

router.get('/helloWorld', function(req, res){
  vmApi.helloWorld()
    .then(function(data){
      res.send(data);
    });
});

module.exports = router;