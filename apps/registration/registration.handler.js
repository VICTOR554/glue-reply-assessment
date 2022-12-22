const fs = require('fs');
const path = './data/user.json';
const database = fs.readFileSync(path);
const user = JSON.parse(database);
const functions = require('../../utility/function');

const getAllUser = function (req, res) {
  let result = {
    status: '',
    msg: '',
    query: '',
    count: user.length,
    data: user,
  };
  if (!user) {
    result.status = 400;
    result.msg = 'There is no user in the database';

    res.status(result.status).send({ result });
  } else if (Object.keys(req.query).length !== 0) {
    data = functions.queryUserHasACreditCard(user, req.query, result).data;
    result = functions.queryUserHasACreditCard(user, req.query, result).result;

    result.status = 201;
    result.query = req.query;
    result.count = data.length;
    result.data = data;
    return res.status(result.status).send(result);
  } else {
    result.status = 201;
    result.msg = 'All the user in the database';
    res.status(result.status).send(result);
  }
};

const createUser = function (req, res) {
  let result = {
    status: '',
    msg: '',
  };

  let data = req.body;

  //functions to configure, validate and check Registration Parameter
  if (data.dateOfBirth) {
    data = functions.configureRegistrationParameter(data);
  }

  result = functions.validateRegistrationParameter(data, result);
  result = functions.checkUserIsUnderage(data, result);
  result = functions.checkUsernameIsInTheDatabase(user, data, result);

  if (!result.status) {
    user.push({
      name: data.name.trim(),
      email: data.email,
      dateOfBirth: data.dateOfBirth,
      creditCard: data.creditCard,
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
        res.statusMessage = result.msg;
        res.status(result.status).json({ statusMessage: result.msg }).send();
        console.log(res.statusCode);
      }
    });
  } else {
    res.statusMessage = result.msg;
    res.status(result.status).json({ statusMessage: result.msg }).send();
    console.log(res.statusCode);
  }
};

module.exports = {
  createUser,
  getAllUser,
};
