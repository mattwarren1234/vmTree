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

// [thought - how i’m going to be old soon and will have to work so hard to catch the attention of people]

    var categories = {
        'someCatId' : 23, //valid category id as of jan 3 1:24pm
    };

    it ('get all cats all of the cats', function(done){
        var resultCount = 20;
        var defaultSearch = {
            zipCode : 92117,
            radius : 5,
            results : resultCount
        };
        vmWrapper.getAll(defaultSearch)
            .then(function(catData){
                expect(catData.totalCount).toBeGreaterThan(0);
                expect(catData.opportunities).toBeDefined();
                catData.forEach(function(category){
                    expect(category.id).toBeDefined();
                    expect(category.name).toBeDefined();
                    expect(category.totalCount).toBeGreaterThan(0);
                    expect(category.opportunities).toBeDefined();
                    expect(category.opportunities.length).toBeDefined();
                    expect(typeof category.opportunities).toBe("object");
                });
            });

    });
    it ('given cat id should have total number of opps', function(){
        var defaultSearch = {
            zipCode : 92117,
            radius : 5,
            results : 20
        };
        var searchParams = Object.create(defaultSearch);
        searchParams.catId = categories.someCatId;
        var opportunities = vmWrapper.getOpportunities(searchParams);
        expect(opportunities.totalCount).toBeDefined();
        expect(opportunities.totalCount).toBeGreaterThan(0);
    });

});