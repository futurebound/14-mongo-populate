'use strict';

//application dependencies
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./error-handler');
const debug = require('debug')('http:server.js');


//application setup
const app = express();
const PORT = process.env.PORT;
const router = express.Router();
const MONGODB_URI = process.env.MONGODB_URI;


//middleware
app.use(cors());
app.use('/api/v1', router);
require('../route/route-animal')(router);
//CATCHALL, WHICH HAS TO BE BELOW ANY OTHER ROUTES WE ARE DECLARING
app.use('/{0,}', (req, res) => errorHandler(new Error('Path Error: Route not found.'), res));


//server controls
const server = module.exports = {};

server.start = () => { //will return these as promises
  return new Promise((resolve, reject) => {
    if(server.isOn) return reject(new Error('Server already running. Cannot start again.'));
    debug(`PORT: ${PORT}, MDB_URI: ${MONGODB_URI}`);

    server.http = app.listen(PORT, () => { //app.listen() takes PORT number and a callback
      console.log(`Listening on ${PORT}`);
      mongoose.connect(MONGODB_URI); //shitload of things you can pass in here
      server.isOn = true;
      return resolve(server); //RETURNS THE FUCKING SERVER as a resolved promise, so can .then() and have access to server instance
    });
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => { 
    if(!server.isOn) return reject(new Error('Server not running. Cannot shut down.'));

    server.http.close(() => {
      console.log('Shutting down server.');
      //disconnect DB connection
      mongoose.disconnect();
      server.isOn = false;
      return resolve(server);
    });
  });
};