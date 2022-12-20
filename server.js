const express = require('express');

//Route file
const register = require('./apps/registration/registration');

//Mount routers
app.use('/registration', register);

//initialize app variable with express
const app = express();

const PORT = 6000;

//run server
app.listen(PORT, console.log(`Server running on port ${PORT}`));
