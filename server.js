const express = require('express');

//initialize app variable with express
const app = express();

const PORT = 6000;

//run server
app.listen(PORT, console.log(`Server running on port ${PORT}`));
