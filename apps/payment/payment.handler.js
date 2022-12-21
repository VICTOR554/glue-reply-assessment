const fs = require('fs');
const database = fs.readFileSync('./data/payment.json');
const payment = JSON.parse(database);
const functions = require('../../utility/function');

const getAllPayment = function (req, res) {
  res.status(200).json({ success: true, count: payment.length, data: payment });
};

const createPayment = function (req, res) {
  let result = {
    status: 201,
    msg: 'success',
    count: payment.length,
    data: payment,
  };

  let data = req.body;

  //function to validate Payment Parameter
  result = functions.validateRegistrationParameter(data, result);

  if (!result.status) {
    payment.push({
      creditCard: data.creditCard,
      amount: data.amount,
    });

    const database = JSON.stringify(payment, null, 2);
    fs.writeFile('./data/payment.json', database, (err) => {
      if (err) {
        result.status = '400';
        result.msg = err;

        res.status(result.status).send(result);
      } else {
        res.status(result.status).send(result);
      }
    });
  }
  res.status(result.status).send(result);
};

module.exports = {
  getAllPayment,
  createPayment,
};
