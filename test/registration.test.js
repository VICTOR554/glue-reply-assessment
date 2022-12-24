const chai = require('chai');
const should = chai.should();
const fs = require('fs');
const database = fs.readFileSync('./data/user.json');
const user = JSON.parse(database);
const handler = require('../apps/registration/registration.handler');
const httpMocks = require('node-mocks-http');

let req, res, newUser, resData;

beforeEach(() => {
  newUser = {
    username: 'John',
    email: 'victor@gmail.com',
    dateOfBirth: '12/12/2000',
    creditCardNumber: 1234567890123456,
    password: 'Passcode1',
  };
});

describe('Get All User function', () => {
  context('Get All User to be tested', () => {
    afterEach(() => {
      console.log('=========afterEach');
      console.log('resStatus   :' + res.statusCode);
      console.log('=============================');
    });

    beforeEach(() => {
      // httpMocks
      req = httpMocks.createRequest({
        method: 'GET',
        url: '/registration/all',
      });
      res = httpMocks.createResponse();
    });

    it('it should get all users from the database', () => {
      handler.getAllUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(201);
      resData = res._getJSONData();
      resData.should.be.a('object');
      resData.should.have.property('msg');
      resData.msg.should.equal('All the user in the database');
      resData.data.should.be.an('array');
      resData.data.should.be.eql(user);
    });

    it('it should get all users with a credit card in the database', () => {
      req.query = { creditCard: 'yes' };
      handler.getAllUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(201);
      resData = res._getJSONData();
      resData.should.be.a('object');
      resData.should.have.property('msg');
      resData.msg.should.equal(
        'All users with a credit card number in the database'
      );
    });

    it('it should get all users without credit card the database', () => {
      req.query = { creditCard: 'no' };
      handler.getAllUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(201);
      resData = res._getJSONData();
      resData.should.be.a('object');
      resData.should.have.property('msg');
      resData.msg.should.equal(
        'All users without a credit card number in the database'
      );
    });
  });
});

describe('Create User Function', () => {
  afterEach(() => {
    console.log('=========afterEach');
    console.log('resStatus   :' + res.statusCode);
    console.log('=============================');
  });

  beforeEach(() => {
    // httpMocks
    req = httpMocks.createRequest({
      method: 'GET',
      url: '/registration/new',
    });
    res = httpMocks.createResponse();
    req.body = newUser;
  });
  context('Username to be tested', () => {
    it('it should check username is empty', () => {
      req.body.username = '';
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      let resData = res._getJSONData();
      resData.should.be.a('object');
      resData.should.have.property('msg');
      resData.msg.should.equal('username is not valid');
    });

    it('it should check username is wrong data type', () => {
      req.body.username = 2;
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      let resData = res._getJSONData();
      resData.should.be.a('object');
      resData.should.have.property('msg');
      resData.msg.should.equal('username is not valid');
    });
  });

  context('email to be tested', () => {
    it('it should check email is empty', () => {
      req.body.email = '';
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      let resData = res._getJSONData();
      resData.should.be.a('object');
      resData.should.have.property('msg');
      resData.msg.should.equal('email is not valid');
    });

    it('it should check email is wrong data type', () => {
      req.body.email = 2;
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      let resData = res._getJSONData();
      resData.should.be.a('object');
      resData.should.have.property('msg');
      resData.msg.should.equal('email is not valid');
    });

    it('it should check email is wrong format ', () => {
      req.body.email = 'victor.com';
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      let resData = res._getJSONData();
      resData.should.be.a('object');
      resData.should.have.property('msg');
      resData.msg.should.equal('email is not valid');
    });
  });

  context('Date of Birth to be tested', () => {
    it('it should check Date of Birth is empty', () => {
      req.body.dateOfBirth = '';
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      let resData = res._getJSONData();
      resData.should.be.a('object');
      resData.should.have.property('msg');
      resData.msg.should.equal('Date of birth is not valid');
    });

    it('it should check Date of Birth is wrong data type', () => {
      req.body.dateOfBirth = 2;
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      let resData = res._getJSONData();
      resData.should.be.a('object');
      resData.should.have.property('msg');
      resData.msg.should.equal('Date of birth is not valid');
    });

    it('it should check Date of Birth is wrong format (dd/mm/yyyy) ', () => {
      req.body.dateOfBirth = '12/123/2002';
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      let resData = res._getJSONData();
      resData.should.be.a('object');
      resData.should.have.property('msg');
      resData.msg.should.equal(
        'Date of birth is wrong format. It should be in format dd/mm/yyyy'
      );
    });
  });

  context('Credit Card to be tested', () => {
    it('it should check Credit Card is wrong data type', () => {
      req.body.creditCardNumber = 'credit';
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      let resData = res._getJSONData();
      resData.should.be.a('object');
      resData.should.have.property('msg');
      resData.msg.should.equal('Credit card number is not valid');
    });

    it('it should check Credit Card is wrong length', () => {
      req.body.creditCardNumber = 1234;
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      let resData = res._getJSONData();
      resData.should.be.a('object');
      resData.should.have.property('msg');
      resData.msg.should.equal('Credit card number should have 16 digits');
    });
  });

  context('Password to be tested', () => {
    it('it should check Password empty', () => {
      req.body.password = '';
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      let resData = res._getJSONData();
      resData.should.be.a('object');
      resData.should.have.property('msg');
      resData.msg.should.equal('Password is not valid');
    });

    it('it should check Password wrong data type', () => {
      req.body.password = 1234;
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      let resData = res._getJSONData();
      resData.should.be.a('object');
      resData.should.have.property('msg');
      resData.msg.should.equal('Password is not valid');
    });

    it('it should check Password wrong length', () => {
      req.body.password = 'Pass1';
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      let resData = res._getJSONData();
      resData.should.be.a('object');
      resData.should.have.property('msg');
      resData.msg.should.equal('Password must have 8 or more characters');
    });

    it('it should check password must have one number', () => {
      req.body.password = 'Passcode';
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      let resData = res._getJSONData();
      resData.should.be.a('object');
      resData.should.have.property('msg');
      resData.msg.should.equal(
        'Password must have at least one uppercase letter & number'
      );
    });

    it('it should check password must have  one upper case letter', () => {
      req.body.password = 'passcode1';
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      let resData = res._getJSONData();
      resData.should.be.a('object');
      resData.should.have.property('msg');
      resData.msg.should.equal(
        'Password must have at least one uppercase letter & number'
      );
    });
  });

  context('Username is registered', () => {
    it('it should check Username is registered', () => {
      req.body.username = 'T1';
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(409);
      let resData = res._getJSONData();
      resData.should.be.a('object');
      resData.should.have.property('msg');
      resData.msg.should.equal('Username is already in the database');
    });
  });

  context('User is Underage to be tested', () => {
    it('it should check user is Underage', () => {
      req.body.dateOfBirth = '12/12/2010';
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(403);
      let resData = res._getJSONData();
      resData.should.be.a('object');
      resData.should.have.property('msg');
      resData.msg.should.equal('User is less than 18 years old');
    });
  });

  context('User is valid to be tested', () => {
    it('it user is valid', () => {
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(201);
    });
  });
});
