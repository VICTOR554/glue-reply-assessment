const fs = require('fs');
const data = fs.readFileSync('./data/user.json');
const user = JSON.parse(data);

const getAllUser = function (req, res) {
  res.status(200).json({ success: true, data: user });
};

const createUser = function (req, res) {
  res.status(200).json({ success: true });
};

module.exports = {
  createUser,
  getAllUser,
};
