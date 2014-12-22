'use strict';

var vmApi = require('../services/vmApi.js');

var isJSON = function(input){
    //takes STRING as input. determines if valid json
    try {
        JSON.parse(input);
        return true;
    } catch (err){
        console.log('ERROR CAUGHT : ' + err);
        return false;
    }
};
xdescribe('query builder', function(){
    it('should return string', function(){
        expect(vmApi.buildQuery).toBeDefined();
        var action = "getMetaData";
        var options = {version : 1};
        expect(typeof vmApi.buildQuery(action, options)).toBe('string');
        console.log(vmApi.buildQuery(action, options));
    });
});

xdescribe('getCategories', function(){
    it('should ', function(done){
        expect(vmApi.getCategories).toBeDefined();
        vmApi.getCategories().
            then(function(response){
                expect(response).toBeDefined();
                done();
            });
    });
});

describe('searchOrganizations', function(){
    it('should ', function(done){
        var searchCriteria = {
            "location" : "94108",
            "nbOfResults": 10,
            "pageNumber": 3,
            "fieldsToDisplay": [ "name", "location" ],
            "names" : [ "red cross" ]
        };
        expect(vmApi.searchOrganizations).toBeDefined();
        vmApi.searchOrganizations(searchCriteria).
            then(function(response){
                expect(response).toBeDefined();
                console.log(response);
                done();
            });
    });
});

describe('helloWorld', function(){
    it ('function defined', function(){
        expect(vmApi.helloWorld).toBeDefined();
    });
    it ('returns json object response', function(done){
        vmApi.helloWorld().
            then(function(response){
                expect(response).toBeDefined();
                expect(typeof response).toBe('string');
                expect(response.trim()).not.toBe('');
                done();
            });
    });
});