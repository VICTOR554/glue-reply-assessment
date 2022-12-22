const chai = require('chai');
const should = chai.should();

const handler = require('../apps/registration/registration.handler');
const httpMocks = require('node-mocks-http');

let req, res, newUser;
beforeEach(() => {
  newUser = {
    name: 'John2',
    email: 'victor@gmail.com',
    dateOfBirth: '12/12/2000',
    creditCard: 1234567890123456,
    password: 'Passcode1',
  };

  // httpMocks
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});
