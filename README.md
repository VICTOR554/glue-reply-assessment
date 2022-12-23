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
   `npm i -D chai` -
   `npm i -D node-mocks-http` -used to as request and response mockops for testing

## Before you run the solution

### The main sctipt (server.js)

In the main script, server.js, is where the server is running on port 6000. Also this where the routers are mounted, however the routes are defined in app/registration/registration.js and app/payment/payment.js.

### The Routes (app/registration/registration.js & app/payment/payment.js.)

### The Registration Handler (app/registration/registration.handlers.js )

The registration handler imports file system to read and write into data/user.json file. The data/user.json file acts as the user database.
Within the registration handler there are 2 functions. The first function is getAllUser

### The Payment Handler (app/payment/payment.handlers.js )

### The Functions (app/payment/payment.handlers.js )

### The Functions (app/data/user.json & app/payment.json )

### Test script (test/payment.js and test/registration.js)

registration.test.js holds 19 test cases, while payment.test.js holds 9 test cases. The unit test is written in a BDD assertion style using chaijs and mochajs with should to express the library. To run the tests, run `npm test` in the terminal.

## Running the application

The project has been set up to run server.js whenever you run `npm start` in the terminal.
