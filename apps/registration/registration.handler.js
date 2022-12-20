const fs = require('fs');
const database = fs.readFileSync('./data/user.json');
const user = JSON.parse(database);
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

  let data = req.body;

  if (!data) {
    result.status = 400;
    result.msg = 'There is no req.body';
    res.status(result.status).send(result);
  } else {
    //function to validate Registration Parameter
    data = functions.configureRegistrationParameter(data);
    result = functions.validateRegistrationParameter(data, result);
    result = functions.checkUserIsUnderage(data, result);

    user.push({
      name: data.name,
      email: data.email,
      dateOfBirth: data.dateOfBirth,
      creditCard: data.creditCard,
      password: data.password,
    });

    const database = JSON.stringify(user, null, 2);
    fs.writeFile('./data/user.json', database, (err) => {
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
