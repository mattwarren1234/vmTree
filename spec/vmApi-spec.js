var vmApi = require('../services/vmApi.js');

var isJSON = function(input){
    try {
        JSON.parse(input);
        return true;
    } catch (err){
        return false;
    }
};

describe('helloWorld', function(){
    it ('function defined', function(){
        expect(vmApi.helloWorld).toBeDefined();
    });
    it ('async works', function(done){
        vmApi.helloWorld().
            then(function(response){
                expect(isJSON(response)).toBe(true);
                done();
            });
    });
});