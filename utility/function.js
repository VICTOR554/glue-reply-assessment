exports.configureRegistrationParameter = function (data) {
  //Remove white space in name
  data.name = data.name.trim();

  //Convert Date of birth to iso 8601
  let dateOfBirth = new Date(data.dateOfBirth);
  data.dateOfBirth = dateOfBirth.toISOString();

  return data;
};

exports.validateRegistrationParameter = function (data, result) {
  if (!data.name || typeof data.name !== 'string') {
    result.status = 400;
    result.msg += 'name parameter is not valid';
  } else if (data.name == data.name.toLowerCase() || !/\d/.test(data.name)) {
    result.status = 400;
    result.msg += 'name parameter must atleast one uppercase letter & number';
  }

  if (
    !data.email ||
    typeof data.email !== 'string' ||
    !data.email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    result.status = 400;
    result.msg += 'email parameter is not valid';
  }

  if (
    !data.dateOfBirth ||
    typeof data.dateOfBirth !== 'string' ||
    !Date.parse(data.dateOfBirth)
  ) {
    result.status = 400;
    result.msg += 'Date of birth parameter is not valid';
  }

  if (data.creditCard && typeof data.creditCard !== 'number') {
    result.status = 400;
    result.msg += 'Credit card parameter is not valid';
  } else if (data.creditCard && data.creditCard.toString().length !== 16) {
    result.status = 400;
    result.msg += 'Credit card parameter should have 16 digits';
  }

  if (!data.password || typeof data.password !== 'string') {
    result.status = 400;
    result.msg += 'Password parameter is not valid';
  } else if (data.password.length < 8) {
    result.status = 400;
    result.msg += 'Password must have 8 or more characters';
  }
  if (!result.status) {
    result.status = 201;
    result.msg = 'Succcess from validation Params';
  }
  return result;
};

exports.validatePaymentParameter = function (data, result) {
  if (!data.creditCard || typeof data.creditCard !== 'number') {
    result.status = 400;
    result.msg += 'Credit card parameter is not valid';
  } else if (!data.creditCard || data.creditCard.toString().length !== 16) {
    result.status = 400;
    result.msg += 'Credit card parameter should have 16 digits';
  }

  if (!data.amount || typeof data.amount !== 'number') {
    result.status = 400;
    result.msg += 'Amount parameter is not valid';
  }

  if (!result.status) {
    result.status = 201;
    result.msg = 'Succcess from validation Params';
  }
  return result;
};

exports.checkUserIsUnderage = function (data, result) {
  let dateOfBirth = new Date(data.dateOfBirth);
  let today = new Date();
  let age = today.getFullYear() - dateOfBirth.getFullYear();
  let month = today.getMonth() - dateOfBirth.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < dateOfBirth.getDate())) {
    age--;
  }

  if (age < 18) {
    result.status = 403;
    result.msg = 'User is less than 18 years old';
  }

  return result;
};

exports.checkUsernameIsInTheDatabase = function (oldData, newdata, result) {
  for (let i = 0; i < oldData.length; i++) {
    if (oldData[i].name == newdata.name) {
      result.status = 409;
      result.msg = 'Username is already in the database';
    }
  }

  return result;
};
