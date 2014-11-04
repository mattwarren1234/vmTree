var request = require('request');

describe('request', function(){
    it('works with google.com', function(done){
      request('http://www.google.com', function (error, response, body) {
        
        expect(body).toBeDefined();
        expect(response.statusCode).toEqual(200);
        done();
      });
    });
});
