const fs = require('fs');
const database = fs.readFileSync('./data/payment.json');
const payment = JSON.parse(database);
const functions = require('../../utility/function');
const database2 = fs.readFileSync('./data/user.json');
const user = JSON.parse(database2);

const getAllPayment = function (req, res) {
  let result = {
    status: '',
    msg: '',
    query: '',
    count: payment.length,
    data: payment,
  };

  if (!payment) {
    result.status = 400;
    result.msg = 'There is no payment in the database';
    res.status(result.status).json(result);
  } else {
    result.status = 201;
    result.msg = 'All the payment in the database';
    res.status(result.status).json(result);
  }
};

const createPayment = function (req, res) {
  let data = req.body;

  let result = {
    status: '',
    msg: '',
    data: payment,
  };

  //function to validate and check Payment Parameter
  result = functions.validatePaymentParameter(data, result);

  if (result.status) {
    return res.status(result.status).json(result);
  }

  result = functions.checkCreditCardHasAUser(user, data, result);

  if (!result.status) {
    payment.push({
      creditCard: data.creditCard,
      amount: data.amount,
    });

    const database = JSON.stringify(payment, null, 2);
    fs.writeFile('./data/payment.json', database, (err) => {
      if (err) {
        result.status = 400;
        result.msg = err;
        res.status(result.status).send(result);
      } else {
        result.status = 201;
        result.msg = 'Success';
        res.status(result.status).send(result);
      }
    });
  } else {
    res.status(result.status).json(result);
  }
};

module.exports = {
  getAllPayment,
  createPayment,
};
