const fs = require('fs');
const data = fs.readFileSync('./data/payment.json');
const payment = JSON.parse(data);

const getAllPayment = function (req, res) {
  res.status(200).json({ success: true, count: payment.length, data: payment });
};

const createPayment = function (req, res) {
  res.status(200).json({ success: true });
};

module.exports = {
  getAllPayment,
  createPayment,
};
