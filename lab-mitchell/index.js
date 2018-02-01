'use strict';

require('dotenv').config();
require('./lib/server').start();


// NO LONGER PASSING ENV VARS TO ENTRY POINT, PASSING DIRECTLY INTO SERVER.JS

// if(process.env.NODE_ENV !== 'production') require('dotenv').config();

// const server = require('./lib/server');
// server.start(process.env.PORT, () => console.log(`listening on ${process.env.PORT}`));