const express = require('express');
const dotenv = require('dotenv');

//Load env vars
dotenv.config({ path: './config/config.env' });

//Route file
const register = require('./apps/registration/registration');
const payment = require('./apps/payment/payment');

//initialize app variable with express
const app = express();

//Body parser
app.use(express.json());

//Mount routers
app.use('/registration', register);
app.use('/payment', payment);

const PORT = process.env.PORT || 6000;

//run server
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
