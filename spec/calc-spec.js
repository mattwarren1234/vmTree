var calculator = require('../services/calc.js');

describe("multiplication",function(){
    it ("should multiply 2 and 3", function(){
       var products = calculator.multiply(2,3);
       expect(products).toBe(6);
    });
});