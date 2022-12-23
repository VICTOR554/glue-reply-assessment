const chai = require('chai');
const should = chai.should();
const fs = require('fs');
const database = fs.readFileSync('./data/payment.json');
const payment = JSON.parse(database);
const handler = require('../apps/payment/payment.handler');
const httpMocks = require('node-mocks-http');

let req, res, newPayment;

beforeEach(() => {
  newPayment = {
    creditCardNumber: 1234567890123456,
    amount: 123,
  };
});

describe('Get All Payment function', () => {
  context('Get All Payment to be tested', () => {
    after(() => {
      console.log('=========after');
      console.log('resStatus   :' + res.statusCode);
      console.log('=============================');
    });

    beforeEach(() => {
      // httpMocks
      req = httpMocks.createRequest({
        method: 'GET',
        url: '/payment/all',
      });
      res = httpMocks.createResponse();
    });

    it('it should get all payment from the database', () => {
      handler.getAllPayment(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(201);
      resData = res._getJSONData();
      resData.should.be.a('object');
      resData.should.have.property('msg');
      resData.msg.should.equal('All the payment in the database');
      resData.data.should.be.an('array');
      resData.data.should.be.eql(payment);
    });
  });
});

describe('Create Payment Function', () => {
  afterEach(() => {
    console.log('=========afterEach');
    console.log('resStatus    :' + res.statusCode);
    console.log('=============================');
  });

  beforeEach(() => {
    // httpMocks
    req = httpMocks.createRequest({
      method: 'POST',
      url: '/payment/new',
    });
    res = httpMocks.createResponse();

    req.body = newPayment;
  });

  context('Credit Card to be tested', () => {
    it('it should check Credit Card is not empty', () => {
      req.body.creditCardNumber = '';
      handler.createPayment(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      resData = res._getJSONData();
      resData.should.be.a('object');
      resData.should.have.property('msg');
      resData.msg.should.equal('Credit card number is not valid');
    });

    it('it should check Credit Card is wrong data type', () => {
      req.body.creditCardNumber = 'credit';
      handler.createPayment(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      resData = res._getJSONData();
      resData.should.be.a('object');
      resData.should.have.property('msg');
      resData.msg.should.equal('Credit card number is not valid');
    });

    it('it should check Credit Card is wrong length', () => {
      req.body.creditCardNumber = 1234;
      handler.createPayment(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      resData = res._getJSONData();
      resData.should.be.a('object');
      resData.should.have.property('msg');
      resData.msg.should.equal('Credit card number should have 16 digits');
    });

    it('it should check Credit Card is registered to a user', () => {
      req.body.creditCardNumber = 1212121212121212;
      handler.createPayment(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(404);
      resData = res._getJSONData();
      resData.should.be.a('object');
      resData.should.have.property('msg');
      resData.msg.should.equal('Credit Card number is not registered');
    });
  });

  context('amount to be tested', () => {
    it('it should check amount is empty', () => {
      req.body.amount = '';
      handler.createPayment(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      resData = res._getJSONData();
      resData.should.be.a('object');
      resData.should.have.property('msg');
      resData.msg.should.equal('Amount is not valid');
    });
    it('it should check amount is wrong data type', () => {
      req.body.amount = '2';
      handler.createPayment(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      resData = res._getJSONData();
      resData.should.be.a('object');
      resData.should.have.property('msg');
      resData.msg.should.equal('Amount is not valid');
    });
    it('it should check amount is less than 3 digits ', () => {
      req.body.amount = 2033;
      handler.createPayment(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      resData = res._getJSONData();
      resData.should.be.a('object');
      resData.should.have.property('msg');
      resData.msg.should.equal('Amount should have a maximum of 3 digits');
    });
  });

  context('Payment is valid to be tested', () => {
    after(() => {
      console.log('=========after');
      // console.log('res   :' + Object.keys(res));
      console.log('res2  2  :' + res.statusCode);
      // handler.createUser(req, res).removeAllListeners('event');
    });
    it('it payment is valid', () => {
      handler.createPayment(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(201);
      res.should.have.property('statusMessage');
      res.statusMessage.should.contain('Success');
    });
    // it('it payment is valid', () => {
    //   handler.createPayment(req, res);
    //   res.should.be.a('object');
    //   res.should.have.property('statusCode');
    //   res.statusCode.should.equal(201);
    //   resData = res._getJSONData();
    //   resData.should.be.a('object');
    //   resData.should.have.property('msg');
    //   resData.msg.should.equal('Success');
    // });
  });
});
