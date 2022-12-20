const fs = require('fs');
const data = fs.readFileSync('./data/user.json');
const user = JSON.parse(data);

const getAllUser = function (req, res) {
  res.status(200).json({ success: true, data: user });
};

const createUser = function (req, res) {
  let result = {
    status: '',
    msg: '',
    data: user,
  };

  user.push({
    name: req.body.name,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth,
    creditCard: req.body.creditCard,
    password: req.body.password,
  });

  const data = JSON.stringify(user, null, 2);
  fs.writeFile('./data/user.json', data, (err) => {
    result.status = '201';
    result.msg = 'success';

    res.status(result.status).send(result);
  });
};

module.exports = {
  createUser,
  getAllUser,
};
