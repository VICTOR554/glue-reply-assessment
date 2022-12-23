const chai = require('chai');
const should = chai.should();

const handler = require('../apps/registration/registration.handler');
const httpMocks = require('node-mocks-http');
const fs = require('fs');

const database = fs.readFileSync('./data/user.json');
const user = JSON.parse(database);

let req, res, newUser, resData;
beforeEach(() => {
  newUser = {
    name: 'John2',
    email: 'victor@gmail.com',
    dateOfBirth: '12/12/2000',
    creditCard: 1234567890123456,
    password: 'Passcode1',
  };
});

describe('Get All User function', () => {
  context('Get All User to be tested', () => {
    afterEach(() => {
      console.log('=========afterEach');
      console.log('res   :' + res.statusCode);
      console.log('=============================');
    });
    beforeEach(() => {
      // httpMocks
      req = httpMocks.createRequest({
        method: 'GET',
        url: '/user',
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
  });
});

describe('Create User Function', () => {
  afterEach(() => {
    console.log('=========afterEach');
    console.log('res   :' + res.statusCode);
    console.log('=============================');
  });
  beforeEach(() => {
    // httpMocks
    req = httpMocks.createRequest({
      method: 'GET',
      url: '/user/new',
    });
    res = httpMocks.createResponse();
    req.body = newUser;
  });
  context('Username to be tested', () => {
    it('it should check username is empty', () => {
      req.body.name = '';
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      let resData = res._getJSONData();
      resData.should.be.a('object');
      resData.should.have.property('msg');
      resData.msg.should.equal('name parameter is not valid');
    });
    it('it should check username is wrong data type', () => {
      req.body.name = 2;
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      let resData = res._getJSONData();
      resData.should.be.a('object');
      resData.should.have.property('msg');
      resData.msg.should.equal('name parameter is not valid');
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
      resData.msg.should.equal('email parameter is not valid');
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
      resData.msg.should.equal('email parameter is not valid');
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
      resData.msg.should.equal('email parameter is not valid');
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
      resData.msg.should.equal('Date of birth parameter is not valid');
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
      resData.msg.should.equal('Date of birth parameter is not valid');
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
      resData.msg.should.equal('Date of birth parameter is not valid');
    });
  });

  context('Credit Card to be tested', () => {
    it('it should check Credit Card is wrong data type', () => {
      req.body.creditCard = 'credit';
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      let resData = res._getJSONData();
      resData.should.be.a('object');

      resData.should.have.property('msg');
      resData.msg.should.equal('Credit card parameter is not valid');
    });
    it('it should check Credit Card is wrong length', () => {
      req.body.creditCard = 1234;
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      let resData = res._getJSONData();
      resData.should.be.a('object');
      resData.should.have.property('msg');
      resData.msg.should.equal('Credit card parameter should have 16 digits');
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
      resData.msg.should.equal('Password parameter is not valid');
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
      resData.msg.should.equal('Password parameter is not valid');
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
        'Password parameter must have at least one uppercase letter & number'
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
        'Password parameter must have at least one uppercase letter & number'
      );
    });
  });

  context('Username is registered', () => {
    it('it should check Username is registered', () => {
      req.body.name = 'T1';
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
    after(() => {
      console.log('=========after');
      console.log('res   :' + Object.keys(res));
      console.log('res   code    :' + res.statusCode);
      console.log('res2  msg        :' + res.statusMessage);
    });
    it('it user is valid', () => {
      handler.createUser(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(201);
    });
    // it('it should check user is valid', () => {
    //   handler.createUser(req, res);
    //   res.should.be.a('object');
    //   res.should.have.property('statusCode');
    //   res.statusCode.should.equal(201);
    //   let resData = res._getJSONData();
    //   resData.should.have.property('msg');
    //   resData.msg.should.equal('Success');
    //   resData.data.should.be.an('array');
    //   resData.data.should.be.eql(user);
    // });
  });
});
