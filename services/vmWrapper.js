'use strict';
var vmApi = require('./vmApi');

var categories = [
    ];

var allCategoryData = function(params){
    var promises = categories.map(function(category){
        var searchParams = params;
        searchParams.categoryIds = [category.id];
        return vmApi.searchOpportunities(searchParams)
            .then(function(data){
                data.id = category.id;
                data.name = category.name;
                return data;
            });
    });
    return Promise.all(promises)
        .then(function(catData){
            var totalResults = 0;
            catData.forEach(function(datum){
                totalResults += datum.resultsSize;
            });
            return {
                resultsSize : totalResults,
                catData : catData
            };
        });
};

var getAll = function(searchParams){
    if (categories.length === 0){
        return vmApi.getCategories()
            .then(function(data){ 
                categories = data.categories;
                return allCategoryData(searchParams);
            });
    } else {
        return allCategoryData(searchParams);
    }
};

exports.getAll = getAll;
