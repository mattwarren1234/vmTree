'use strict';

var vmApi = require('../services/vmApi.js');

var isJSON = function(input){
    try {
        JSON.parse(input);
        return true;
    } catch (err){
        return false;
    }
};
describe('query builder', function(){
    it('should return string', function(){
        expect(vmApi.buildQuery).toBeDefined();
        var action = "getMetaData";
        var options = {version : 1};
        expect(typeof vmApi.buildQuery(action, options)).toBe('string');
        console.log('query: ');
        console.log(vmApi.buildQuery(action, options));
    });
});

describe('getCategories', function(){
    it('should ', function(done){
        expect(vmApi.getCategories).toBeDefined();
        vmApi.getCategories().
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