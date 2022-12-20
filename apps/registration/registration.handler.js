const fs = require('fs');
const data = fs.readFileSync('./data/user.json');
const user = JSON.parse(data);
const functions = require('../../utility/function');

const getAllUser = function (req, res) {
  res.status(200).json({ success: true, count: user.length, data: user });
};

const createUser = function (req, res) {
  let result = {
    status: '',
    msg: '',
    data: user,
  };

  if (!req.body) {
    result.status = 400;
    result.msg = 'There is no req.body';
    res.status(result.status).send(result);
  } else {
    //function to validate Registration Parameter
    result = functions.validateRegistrationParameter(req.body, result);

    user.push({
      name: req.body.name,
      email: req.body.email,
      dateOfBirth: req.body.dateOfBirth,
      creditCard: req.body.creditCard,
      password: req.body.password,
    });

    const data = JSON.stringify(user, null, 2);
    fs.writeFile('./data/user.json', data, (err) => {
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
  createUser,
  getAllUser,
};
