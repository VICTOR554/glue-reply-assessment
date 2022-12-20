const fs = require('fs');
const data = fs.readFileSync('./data/user.json');

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
