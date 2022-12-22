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

describe('Create User Function', () => {
  afterEach(() => {
    console.log('=========afterEach');
    console.log('res   :' + res.statusCode);
    console.log('=============================');
  });
  beforeEach(() => {
    // console.log('=========beforeeach');
    req.body = newUser;
  });
  context('Username to be tested', () => {
    it('it should check username empty', () => {
      req.body.name = '';
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      res.should.have.property('statusMessage');
      res.statusMessage.should.contain('name parameter is not valid');
    });
    it('it should check username wrong data type', () => {
      req.body.name = 2;
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      res.should.have.property('statusMessage');
      res.statusMessage.should.contain('name parameter is not valid');
    });
    it('it should check Username is registered', () => {
      req.body.name = 'T1';
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(409);
      res.should.have.property('statusMessage');
      res.statusMessage.should.contain('Username is already in the database');
    });
  });

  context('email to be tested', () => {
    it('it should check email empty', () => {
      req.body.email = '';
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      res.should.have.property('statusMessage');
      res.statusMessage.should.contain('email parameter is not valid');
    });
    it('it should check email wrong data type', () => {
      req.body.email = 2;
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      res.should.have.property('statusMessage');
      res.statusMessage.should.contain('email parameter is not valid');
    });
    it('it should check email wrong format ', () => {
      req.body.email = 'victor.com';
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      res.should.have.property('statusMessage');
      res.statusMessage.should.contain('email parameter is not valid');
    });
  });
});
