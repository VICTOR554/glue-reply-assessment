const express = require('express');

//Route file
const register = require('./apps/registration/registration');
const payment = require('./apps/payment/payment');

//initialize app variable with express
const app = express();

//Mount routers
app.use('/user', register);
app.use('/payment', payment);

const PORT = 6000;

//run server
app.listen(PORT, console.log(`Server running on port ${PORT}`));
