# glue-reply-assessment

Repo containing solution for the contact associate software engineering role

## Installation

1. This solution was made in the nodejs environment so to run it locally you'd should have node installed
2. After node is installed, open up a ternminal and navigate to the project folder, then run the foollowing installs below
   `npm install` -to install all npm dependencies in the project
   `npm i express` - Express helps with managing the server and routes
   `npm i dotenv` - dotenv helps with managing envirnmental variables
   `npm i -D nodemon` - nodemon was used to monitors the project directory and automatically restarts the node application when it detects any changes
   `npm i -D mocha` - a testing library used for unit testing in the project
   `npm i -D chai` -is an assertion library used with mocha.js
   `npm i -D node-mocks-http` -used to as request and response mockops for testing

## Before you run the solution

### The main script (server.js)

In the main script, server.js, is where the server is running on port 6000. Also this where the routers are mounted

### The Routes (apps/registration/registration.js & apps/payment/payment.js.)

The get and post routes are defined in apps/registration/registration.js & apps/payment/payment.js.

### The Registration Handler (app/registration/registration.handlers.js )

The registration handler imports the file system to read and write into data/user.json file. The data/user.json file acts as the user database.
Within the registration handler there are 2 functions. The first function is getAllUser, which gets all the users in the user database. The second function is createUser, this function takes in the req.body and runs it throught the validation functions in validations.js. If there is no change to the result.status , then there are no error and the function will push the data in req.body to the user database.

### The Payment Handler (app/payment/payment.handlers.js )

The payment handler does the same thing as the Registration Handler with the data it is given. However, the payment database is data/payment.json

### The Validation Functions (app/utility/validations.js )

0. The result object stated in registration and payment handlers consist mainly of status, msg and data. The result is passed as the final data to pass to the http response of registration and payment handlers.

```
let result = {
    status: '',
    msg: '',
    data: ',
  };
```

1. validateRegistrationParameter(data, result) takes in the req.body as data and result. The req.body consist of username, email, dateOfBirth, creditCardNumber and password. validateRegistrationParameter function does an if statement to verify that the properties in req.body are present, the correct length and are of the stated type. The result.msg is based on which if statement is deemed true as it goes through all the properties.

2. configureDateOfBirthParameter(data) function was created to convert the date of birth of the user to iso string.

3. validatePaymentParameter(data, result) is the same as validateRegistrationParameter but it only verifies the credit card and amount.

4. checkUserIsUnderage(data, result) function validates if the user is underage.

5. checkUsernameIsInTheDatabase(oldData, newdata, result) function uses oldData which is userdatabase and newData which is req.body. This function creates a loop and check if any on the username match the username in the req.body.

6. checkCreditCardHasAUser(oldData, newdata, result) function uses oldData which is userdatabase and newData which is req.body. This function is similar with checkUsernameIsInTheDatabase function but with the credit card number

7. queryUserHasACreditCard(data, query, result) is a function that sends users that have a credit card or users that dont have a credit card based off of the req.query.

### The Database (app/data/user.json & app/payment.json )

As stated above the database for the application are app/data/user.json & app/payment.json.

### The Test script (test/registration.test.js & test/payment.test.js )

The test script creates a mock req and res which are used to test the get and post request. Also the test script hold a newUser object that is used to replace the req.body. The test script checks if the status and message match the given response. An example is setting the name to a number and checking if the status is 400 and the message is username is invalid.

### Running The Test script (test/payment.js and test/registration.js)

registration.test.js holds 21 test cases, while payment.test.js holds 9 test cases. The unit test is written in a BDD assertion style using chai.js and mocha.js with should to express the library. To run the tests, run `npm test` in the terminal.

## Error in the Test script

1. Whenever npm test is run the test newUser is added to the user database (data/user.json), so when npm test is run a second time it throws 409 which means that the user exists in the databse. This can be solve by either deleting the user or changing the username of newUser.
2. If the test is showing 409 it means there is no user in the database that matches the T1 set in the test

## Running the application

The project has been set up to run server.js whenever you run `npm start` in the terminal.

## GET Route

1. http://localhost:6000/payment/all
2. http://localhost:6000/registration/all

## POST Route

1. http://localhost:6000/payment/new
2. http://localhost:6000/registration/new

## GET Query

1. http://localhost:6000/registration/all?CreditCard=yes
2. http://localhost:6000/registration/all?CreditCard=yes
