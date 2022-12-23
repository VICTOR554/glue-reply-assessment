const fs = require('fs');
const path = './data/user.json';
const database = fs.readFileSync(path);
const user = JSON.parse(database);
const functions = require('../../utility/validations');

const getAllUser = function (req, res) {
  let result = {
    status: '',
    msg: '',
    query: '',
    count: '',
    data: '',
  };
  if (!user) {
    result.status = 400;
    result.msg = 'There is no user in the database';
    res.status(result.status).json(result);
  } else if (Object.keys(req.query).length !== 0) {
    result = functions.queryUserHasACreditCard(user, req.query, result);

    result.status = 201;
    result.query = req.query;
    result.count = result.data.length;
    res.status(result.status).json(result);
  } else {
    result.status = 201;
    result.msg = 'All the user in the database';
    result.count = user.length;
    result.data = user;
    res.status(result.status).json(result);
  }
};

const createUser = function (req, res) {
  let data = req.body;

  let result = {
    status: '',
    msg: '',
    data: data,
  };

  //functions to validate user is in the database
  result = functions.checkUsernameIsInTheDatabase(user, data, result);

  if (result.status) {
    return res.status(result.status).json(result);
  }

  //functions to validate user is underage
  result = functions.checkUserIsUnderage(data, result);

  if (result.status) {
    return res.status(result.status).json(result);
  }

  //functions to validate Registration Parameter
  result = functions.validateRegistrationParameter(data, result);

  if (!result.status) {
    user.push({
      username: data.username.trim(),
      email: data.email,
      dateOfBirth: result.data.dateOfBirth,
      creditCardNumber: data.creditCardNumber,
      password: data.password,
    });

    const database = JSON.stringify(user, null, 2);
    fs.writeFile(path, database, (err) => {
      if (err) {
        result.status = 400;
        result.msg = err;

        res.status(result.status).send(result);
      } else {
        result.status = 201;
        result.msg = 'Success';
        res.status(result.status).json(result);
      }
    });
  } else {
    res.status(result.status).json(result);
  }
};

module.exports = {
  createUser,
  getAllUser,
};
