const express = require('express');

//Route file
const register = require('./apps/registration/registration');

//initialize app variable with express
const app = express();

//Mount routers
app.use('/user', register);

const PORT = 6000;

//run server
app.listen(PORT, console.log(`Server running on port ${PORT}`));
