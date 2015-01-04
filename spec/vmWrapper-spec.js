'use strict';
var vmWrapper = require('../services/vmWrapper');

describe('vmWrapper', function () {
// 2. if i query for opportunities
// with a given category id
// and results # of 20 
// and sorted by 20
// then 
// property ‘total opps’ exists and is greater than 0.
// array of opps is greater than 0 and no more than 20
// 3. if i do ‘get all opps’ (an aggregation function for me)
// then i get an array of opp categories.
// each opp category has : catID, catName,
// array of opps.
// each opp has

    var categories = {
        'someCatId' : 23, //valid category id as of jan 3 1:24pm
    };

    it ('getAll()', function(done){
        var resultCount = 20;
        var defaultSearch = {
            location : "92117",
            radius : "5",
            results : resultCount
        };
        vmWrapper.getAll(defaultSearch)
            .then(function(data){
                expect(data.resultsSize).toBeGreaterThan(0);
                expect(data.catData).toBeDefined();
                var category = data.catData[0];
                console.log(category);
                expect(category.id).toBeDefined();
                expect(category.name).toBeDefined();
                expect(category.resultsSize).toBeGreaterThan(0);
                expect(category.opportunities).toBeDefined();
                expect(category.opportunities.length).toBeDefined();
                expect(typeof category.opportunities).toBe("object");
                done();
            });

    });
});