const fs = require('fs');
const data = fs.readFileSync('./data/payment.json');
const payment = JSON.parse(data);

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
        result.status = '201';
        result.msg = 'success';

        res.status(result.status).send(result);
      }
    });
  }
};

module.exports = {
  getAllPayment,
  createPayment,
};
