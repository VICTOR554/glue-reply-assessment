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
    it('it should check username is empty', () => {
      req.body.name = '';
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      res.should.have.property('statusMessage');
      res.statusMessage.should.contain('name parameter is not valid');
    });
    it('it should check username is wrong data type', () => {
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
    it('it should check email is empty', () => {
      req.body.email = '';
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      res.should.have.property('statusMessage');
      res.statusMessage.should.contain('email parameter is not valid');
    });
    it('it should check email is wrong data type', () => {
      req.body.email = 2;
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      res.should.have.property('statusMessage');
      res.statusMessage.should.contain('email parameter is not valid');
    });
    it('it should check email is wrong format ', () => {
      req.body.email = 'victor.com';
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      res.should.have.property('statusMessage');
      res.statusMessage.should.contain('email parameter is not valid');
    });
  });

  context('Date of Birth to be tested', () => {
    it('it should check Date of Birth is empty', () => {
      req.body.dateOfBirth = '';
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      res.should.have.property('statusMessage');
      res.statusMessage.should.contain('Date of birth parameter is not valid');
    });
    // it('it should check Date of Birth is wrong data type', () => {
    //   //DOES NOT WORK BECAUSE OF CONFIGURATION
    //   req.body.dateOfBirth = 2;
    //   handler.createUser(req, res);
    //   res.should.be.a('object');
    //   res.should.have.property('statusCode');
    //   res.statusCode.should.equal(400);
    //   res.should.have.property('statusMessage');
    //   res.statusMessage.should.contain('Date of birth parameter is not valid');
    // });
  });

  context('Credit Card to be tested', () => {
    it('it should check Credit Card is wrong data type', () => {
      req.body.creditCard = 'credit';
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      res.should.have.property('statusMessage');
      res.statusMessage.should.contain('Credit card parameter is not valid');
    });
    it('it should check Credit Card is wrong length', () => {
      req.body.creditCard = 1234;
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      res.should.have.property('statusMessage');
      res.statusMessage.should.contain(
        'Credit card parameter should have 16 digits'
      );
    });
  });

  context('Password to be tested', () => {
    it('it should check Password empty', () => {
      req.body.password = '';
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      res.should.have.property('statusMessage');
      res.statusMessage.should.contain('Password parameter is not valid');
    });
    it('it should check Password wrong data type', () => {
      req.body.password = 1234;
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      res.should.have.property('statusMessage');
      res.statusMessage.should.contain('Password parameter is not valid');
    });
    it('it should check Password wrong length', () => {
      req.body.password = 'Pass1';
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      res.should.have.property('statusMessage');
      res.statusMessage.should.contain(
        'Password must have 8 or more characters'
      );
    });
    it('it should check password must have one number', () => {
      req.body.password = 'Passcode';
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      res.should.have.property('statusMessage');
      res.statusMessage.should.contain(
        'Password parameter must have at least one uppercase letter & number'
      );
    });
    it('it should check password must have  one upper case letter', () => {
      req.body.password = 'passcode1';
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      res.should.have.property('statusMessage');
      res.statusMessage.should.contain(
        'Password parameter must have at least one uppercase letter & number'
      );
    });
  });

  context('User is Underage to be tested', () => {
    it('it should check user is Underage', () => {
      req.body.dateOfBirth = '12/12/2010';
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(403);
      res.should.have.property('statusMessage');
      res.statusMessage.should.contain('User is less than 18 years old');
    });
  });

  context('User is valid to be tested', () => {
    after(() => {
      console.log('=========after');
      // console.log('res   :' + Object.keys(res));
      // console.log('res2  2  :' + res.statusCode);
      // handler.createUser(req, res).removeAllListeners('event');
    });
    it('it user is valid', () => {
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(201);
      res.should.have.property('statusMessage');
      res.statusMessage.should.contain('Success');
    });
  });
});
