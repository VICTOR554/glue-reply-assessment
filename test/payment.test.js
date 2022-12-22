const chai = require('chai');
const should = chai.should();

const handler = require('../apps/payment/payment.handler');
const httpMocks = require('node-mocks-http');

let req, res, newPayment;
beforeEach(() => {
  newPayment = {
    creditCard: 1234567890123456,
    amount: 123,
  };

  //  httpMocks
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe('Get All Payment function', () => {});

describe('Create Payment Function', () => {
  afterEach(() => {
    console.log('=========afterEach');
    console.log('res2    :' + res.statusCode);
    console.log('=============================');
  });
  beforeEach(() => {
    req.body = newPayment;
  });
  context('Credit Card to be tested', () => {
    it('it should check Credit Card is not empty', () => {
      req.body.creditCard = '';
      handler.createPayment(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      res.should.have.property('statusMessage');
      res.statusMessage.should.contain('Credit card parameter is not valid');
    });
    it('it should check Credit Card is wrong data type', () => {
      req.body.creditCard = 'credit';
      handler.createPayment(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      res.should.have.property('statusMessage');
      res.statusMessage.should.contain('Credit card parameter is not valid');
    });
    it('it should check Credit Card is wrong length', () => {
      req.body.creditCard = 1234;
      handler.createPayment(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      res.should.have.property('statusMessage');
      res.statusMessage.should.contain(
        'Credit Card is not registeredCredit card parameter should have 16 digits'
      );
    });
    it('it should check Credit Card is registered to a user', () => {
      req.body.creditCard = 1234567890123450;
      handler.createPayment(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(404);
      res.should.have.property('statusMessage');
      res.statusMessage.should.contain('Credit Card is not registered');
    });
  });

  context('amount to be tested', () => {
    it('it should check amount is empty', () => {
      req.body.amount = '';
      handler.createPayment(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      res.should.have.property('statusMessage');
      res.statusMessage.should.contain('Amount parameter is not valid');
    });
    it('it should check amount is wrong data type', () => {
      req.body.amount = '2';
      handler.createPayment(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      res.should.have.property('statusMessage');
      res.statusMessage.should.contain('Amount parameter is not valid');
    });
    it('it should check amount is wrong format ', () => {
      req.body.amount = 2033;
      handler.createPayment(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(400);
      res.should.have.property('statusMessage');
      res.statusMessage.should.contain(
        'Amount should have a maximum of 3 digits'
      );
    });
  });

  context('Payment is valid to be tested', () => {
    // after(() => {
    //   console.log('=========after');
    //   // console.log('res   :' + Object.keys(res));
    //   console.log('res2  2  :' + res.statusCode);
    //   // handler.createUser(req, res).removeAllListeners('event');
    // });
    it('it payment is valid', () => {
      handler.createPayment(req, res);
      res.should.be.a('object');
      res.should.have.property('statusCode');
      res.statusCode.should.equal(201);
      res.should.have.property('statusMessage');
      res.statusMessage.should.contain('Success');
    });
  });
});
