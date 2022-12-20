const getAllPayment = function (req, res) {
  res.status(200).json({ success: true });
};

const createPayment = function (req, res) {
  res.status(200).json({ success: true });
};

module.exports = {
  getAllPayment,
  createPayment,
};
