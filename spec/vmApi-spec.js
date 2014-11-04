var vmApi = require('../services/vmApi.js');

describe('helloworld', function(){
  it('should get response of hello world!', function(done){
    vmApi.helloWorld()
      .then(function(data){
        expect(data).toBe("hello world");
      });
  });
});