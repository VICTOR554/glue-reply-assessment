const fs = require('fs');
const database = fs.readFileSync('./data/payment.json');
const payment = JSON.parse(database);
const functions = require('../../utility/function');
const database2 = fs.readFileSync('./data/user.json');
const user = JSON.parse(database2);

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

  let data = req.body;

  //function to validate and check Payment Parameter
  result = functions.checkCreditCardHasAUser(user, data, result);
  result = functions.validatePaymentParameter(data, result);

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
    // res.status(result.status).send(result);
    res.statusMessage = result.msg;
    res.status(result.status).json({ statusMessage: result.msg }).end();
  }
};

module.exports = {
  getAllPayment,
  createPayment,
};
