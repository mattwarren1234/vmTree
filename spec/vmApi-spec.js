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

xdescribe('query builder', function(){
    it('should return string', function(){
        expect(vmApi.buildQuery).toBeDefined();
        var action = "getMetaData";
        var options = {version : 1};
        expect(typeof vmApi.buildQuery(action, options)).toBe('string');
        console.log(vmApi.buildQuery(action, options));
    });
});

describe('getCategories', function(){
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
    var redCrossSearch  = {
            "location" : "94108",
            "nbOfResults": 10,
            "fieldsToDisplay": [ "name", "location", "url" ],
            "names" : [ "red cross" ]
        };
    var manySearch = {
        "location" : "92117",
        "fieldsToDisplay": [ "name", "location", "url" ],
    };
    it('should ', function(done){
        var searchCriteria = manySearch;
        expect(vmApi.searchOrganizations).toBeDefined();
        vmApi.searchOrganizations(searchCriteria).
            then(function(response){
                expect(response).toBeDefined();
                expect(isJSON(response)).toBe(true);
                expect(JSON.parse(response).resultsSize).toBeGreaterThan(-1);
                done();
            });
    });
});

describe('searchOpportunities', function(){
    //title, type, location, availability, parentOrg, beneficiary, description, plaintextDescription, skillsNeeded, plaintextSkillsNeeded, volunteersNeeded, spacesAvailable, minimumAge, numReferred, requiresAddress, categoryIds, referralFields, imageUrl, created, updated, allowGroupInvitations, allowGroupReservation, hasWaitList, status, tags, virtual, vmUrl, requirements
    var testSearch = {
        "location" : "92117",
        "radius":"2"
    };
        // "numberOfResults": "2",
        // "fieldsToDisplay": ["title"],
        // "categoryIds" : ["11","17"]
    it('should return list of opps', function(done){
        // var searchCriteria = testSearch;
        console.log('search criteria ');
        var searchCriteria = clone(testSearch);
        vmApi.searchOpportunities(searchCriteria).
            then(function(response){
                expect(response).toBeDefined();
                expect(isJSON(response)).toBe(true);
                var result = JSON.parse(response);
                expect(result.resultsSize).toBeGreaterThan(-1);
                console.log("search opps: total results " + result.resultsSize);
                done();
            });
    });

    var clone = function(obj){
        return JSON.parse(JSON.stringify(obj));
    };

    it('changing virtual param should change number of results', function(done){
        // var searchCriteria = testSearch;
        var virtualParams = clone(testSearch);
        virtualParams.virtual = true;
        var nonVirtualParams = clone(testSearch);
        nonVirtualParams.virtual = false;

        var count1, count2;

        vmApi.searchOpportunities(virtualParams)
            .then(function(response){
                expect(isJSON(response)).toBe(true);
                var result = JSON.parse(response);
                expect(result.resultsSize).toBeGreaterThan(-1);
                count1 = result.resultsSize;
            })
            .then(function(){ return vmApi.searchOpportunities(nonVirtualParams); })
            .then(function(response){
                var result = JSON.parse(response);
                count2 = result.resultsSize;
                expect(count1).not.toEqual(count2);
                done();
            });
    });
    it('opportunities should be defined', function(done){
        // var searchCriteria = testSearch;
        var search = clone(testSearch);
        // search.fieldsToDisplay = ["title", "location","vmUrl"];
        vmApi.searchOpportunities(search)
            .then(function(response){
                expect(isJSON(response)).toBe(true);
                var result = JSON.parse(response);
                var opp = result.opportunities[0];
                expect(opp.vmUrl).toBeDefined();
                expect(opp.title).toBeDefined();
                expect(opp.location).toBeDefined();
                expect(result.opportunities).toBeDefined();  //array with props availability, categoryIds
                done();
            });
    });
    it('number of results should control results', function(done){
        var search = clone(testSearch);
        var numResults = 10;
        search.numberOfResults = numResults;
        vmApi.searchOpportunities(search)
            .then(function(response){
                var results = JSON.parse(response).opportunities;
                console.log('number of results : ' + results.length + ' expected : ' + numResults);
                expect(results.length).toEqual(numResults);
                done();
            });

    });

    // numberOfResults
});

