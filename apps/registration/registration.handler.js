const getAllUser = function (req, res) {
  res.status(200).json({ success: true });
};

const createUser = function (req, res) {
  res.status(200).json({ success: true });
};

module.exports = {
  createUser,
  getAllUser,
};
