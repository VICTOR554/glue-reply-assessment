const fs = require('fs');
const data = fs.readFileSync('./data/payment.json');
const payment = JSON.parse(data);
const functions = require('../../utility/function');

const getAllPayment = function (req, res) {
  res.status(200).json({ success: true, count: payment.length, data: payment });
};

const createPayment = function (req, res) {
  let result = {
    status: '',
    msg: '',
    count: payment.length,
    data: payment,
  };

  if (!req.body) {
    result.status = 400;
    result.msg = 'There is no req.body';
    res.status(result.status).send(payment);
  } else {
    //function to validate Payment Parameter
    result = functions.validateRegistrationParameter(req.body, result);

    payment.push({
      creditCard: req.body.creditCard,
      amount: req.body.amount,
    });

    const data = JSON.stringify(payment, null, 2);
    fs.writeFile('./data/payment.json', data, (err) => {
      if (err) {
        result.status = '400';
        result.msg = err;

        res.status(result.status).send(result);
      } else {
        res.status(result.status).send(result);
      }
    });
  }
};

module.exports = {
  getAllPayment,
  createPayment,
};
