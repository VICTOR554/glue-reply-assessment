function configureDateOfBirthParameter(data) {
  //Convert dateOfBirth to dd/mm/yyyy
  //Convert date of birth to iso 8601
  const date = data.dateOfBirth.split('/');
  let dateOfBirth = new Date(date[1] + '/' + date[0] + '/' + date[2]);
  data.dateOfBirth = dateOfBirth.toISOString();

  return data;
}

const validateRegistrationParameter = function (data, result) {
  if (!data.name || typeof data.name !== 'string') {
    result.status = 400;
    result.msg += 'name parameter is not valid';
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

  if (!data.dateOfBirth || typeof data.dateOfBirth !== 'string') {
    result.status = 400;
    result.msg += 'Date of birth parameter is not valid';
  } else {
    data = configureDateOfBirthParameter(data);

    if (!Date.parse(data.dateOfBirth)) {
      result.status = 400;
      result.msg += 'Date of birth parameter is not valid';
    }
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
  } else if (
    data.password == data.password.toLowerCase() ||
    !/\d/.test(data.password)
  ) {
    result.status = 400;
    result.msg +=
      'Password parameter must have at least one uppercase letter & number';
  }

  return result;
};

const validatePaymentParameter = function (data, result) {
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
  } else if (data.amount.toString().length > 3) {
    result.status = 400;
    result.msg += 'Amount should have a maximum of 3 digits';
  }

  return result;
};

const checkUserIsUnderage = function (data, result) {
  let dateOfBirth = new Date(data.dateOfBirth);
  let today = new Date();
  let age = today.getFullYear() - dateOfBirth.getFullYear();
  let month = today.getMonth() - dateOfBirth.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < dateOfBirth.getDate())) {
    age--;
  }

  if (age < 18) {
    result.status = 403;
    result.msg += 'User is less than 18 years old';
  }

  return result;
};

const checkUsernameIsInTheDatabase = function (oldData, newdata, result) {
  for (let i = 0; i < oldData.length; i++) {
    if (oldData[i].name == newdata.name) {
      result.status = 409;
      result.msg += 'Username is already in the database';
    }
  }

  return result;
};

const checkCreditCardHasAUser = function (oldData, newdata, result) {
  let creditCardExist = false;
  for (let i = 0; i < oldData.length; i++) {
    if (oldData[i].creditCard == newdata.creditCard) {
      creditCardExist = true;
    }
  }

  if (creditCardExist == false) {
    result.status = 404;
    result.msg += 'Credit Card is not registered';
  }

  return result;
};

const queryUserHasACreditCard = function (data, query, result) {
  let newData = [];
  let q = Object.values(query)[0].toLowerCase();

  if (q == 'yes') {
    for (let i = 0; i < data.length; i++) {
      if (data[i].creditCard) {
        newData.push(data[i]);
      }
      result.msg = `All users with a credit card `;
    }
  } else if (q == 'no') {
    for (let i = 0; i < data.length; i++) {
      if (!data[i].creditCard) {
        newData.push(data[i]);
      }
      result.msg = `All users without a credit card `;
    }
  }
  data = newData;

  return { data, result };
};

module.exports = {
  validateRegistrationParameter,
  validatePaymentParameter,
  checkUserIsUnderage,
  checkUsernameIsInTheDatabase,
  checkCreditCardHasAUser,
  queryUserHasACreditCard,
};
