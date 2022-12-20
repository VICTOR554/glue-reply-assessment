exports.validateRegistrationParameter = function (data, result) {
  if (!data.name || typeof data.name !== 'string') {
    result.status = 400;
    result.msg += 'name parameter is not valid';
  }

  if (!data.email || typeof data.email !== 'string') {
    result.status = 400;
    result.msg += 'email parameter is not valid';
  }

  if (!data.dateOfBirth || typeof data.dateOfBirth !== 'string') {
    result.status = 400;
    result.msg += 'Date of birth parameter is not valid';
  }

  if (data.creditCard && typeof data.creditCard !== 'number') {
    result.status = 400;
    result.msg += 'Credit card parameter is not valid';
  }

  if (!data.password || typeof data.password !== 'string') {
    result.status = 400;
    result.msg += 'Password parameter is not valid';
  }

  if (!result.status) {
    result.status = 201;
    result.msg = 'Succcess from validation Params';
  }
  return result;
};
