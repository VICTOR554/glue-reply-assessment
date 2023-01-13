function configureDateOfBirthParameter(data) {
  const date = data.dateOfBirth.split('/');
  const day = date[0];
  const month = date[1];
  const year = date[2];
  const d = +date[0];
  const m = +date[1];
  //Check dateOfBirth input day, month and year is the right length
  if (
    month[0].length > 2 ||
    m > 12 ||
    day.length > 2 ||
    d > 31 ||
    year.length > 4
  ) {
    data.dateOfBirth = null;
  } else {
    //Convert date format to dd/mm/yyyy and convert to iso 8601
    let dateOfBirth = new Date(date[1] + '/' + date[0] + '/' + date[2]);
    data.dateOfBirth = dateOfBirth.toISOString();
  }
  return data.dateOfBirth;
}

const validateRegistrationParameter = function (data, result) {
  if (!data.username || typeof data.username !== 'string') {
    result.status = 400;
    result.msg += 'username is not valid';
  }

  if (
    !data.email ||
    typeof data.email !== 'string' ||
    !data.email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    result.status = 400;
    result.msg += 'email is not valid';
  }

  if (!data.dateOfBirth || typeof data.dateOfBirth !== 'string') {
    result.status = 400;
    result.msg += 'Date of birth is not valid';
  } else {
    result.data.dateOfBirth = configureDateOfBirthParameter(data);

    if (result.data.dateOfBirth == null) {
      result.status = 400;
      result.msg +=
        'Date of birth is wrong format. It should be in format dd/mm/yyyy';
    } else if (!Date.parse(result.data.dateOfBirth)) {
      result.status = 400;
      result.msg += 'Date of birth is not valid';
    }
  }

  if (data.creditCardNumber && typeof data.creditCardNumber !== 'number') {
    result.status = 400;
    result.msg += 'Credit card number is not valid';
  } else if (
    data.creditCardNumber &&
    data.creditCardNumber.toString().length !== 16
  ) {
    result.status = 400;
    result.msg += 'Credit card number should have 16 digits';
  }

  if (!data.password || typeof data.password !== 'string') {
    result.status = 400;
    result.msg += 'Password is not valid';
  } else if (data.password.length < 8) {
    result.status = 400;
    result.msg += 'Password must have 8 or more characters';
  } else if (
    data.password == data.password.toLowerCase() ||
    !/\d/.test(data.password)
  ) {
    result.status = 400;
    result.msg += 'Password must have at least one uppercase letter & number';
  }

  return result;
};

const validatePaymentParameter = function (data, result) {
  if (!data.creditCardNumber || typeof data.creditCardNumber !== 'number') {
    result.status = 400;
    result.msg += 'Credit card number is not valid';
  } else if (
    !data.creditCardNumber ||
    data.creditCardNumber.toString().length !== 16
  ) {
    result.status = 400;
    result.msg += 'Credit card number should have 16 digits';
  }

  if (!data.amount || typeof data.amount !== 'number') {
    result.status = 400;
    result.msg += 'Amount is not valid';
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
    if (oldData[i].username.toLowerCase() == newdata.username.toLowerCase()) {
      result.status = 409;
      result.msg += 'Username is already in the database';
    }
  }

  return result;
};

const checkCreditCardHasAUser = function (oldData, newdata, result) {
  let creditCardExist = false;
  for (let i = 0; i < oldData.length; i++) {
    if (oldData[i].creditCardNumber == newdata.creditCardNumber) {
      creditCardExist = true;
    }
  }

  if (creditCardExist == false) {
    result.status = 404;
    result.msg += 'Credit Card number is not registered';
  }

  return result;
};

const queryUserHasACreditCard = function (data, query, result) {
  let newData = [];
  let q = Object.values(query)[0].toLowerCase();

  if (q == 'yes') {
    for (let i = 0; i < data.length; i++) {
      if (data[i].creditCardNumber) {
        newData.push(data[i]);
      }
      result.msg = 'All users with a credit card number in the database';
    }
  } else if (q == 'no') {
    for (let i = 0; i < data.length; i++) {
      if (!data[i].creditCardNumber) {
        newData.push(data[i]);
      }
      result.msg = 'All users without a credit card number in the database';
    }
  }
  result.data = newData;

  return result;
};

module.exports = {
  validateRegistrationParameter,
  validatePaymentParameter,
  checkUserIsUnderage,
  checkUsernameIsInTheDatabase,
  checkCreditCardHasAUser,
  queryUserHasACreditCard,
};
