'use strict';

const Animal = require('../model/animal');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('http:route-animal.js');

module.exports = function (router) {
  router.route('/animal/:_id?')
    .get((req, res) => {
      debug(`${req.method}: ${req.url}`);
      if (req.params._id) { //if a specific ID being request, since no way to make 2 different GET requests with this pattern
        Animal.findById(req.params._id)
          .then(animal => res.status(200).json(animal))
          // animal
          //   ? res.status(200).json(animal)
          //   : errorHandler(new Error('enoent'), res);
          //.json sets content to application/json then stringifies the raw object
          .catch(err => errorHandler(err, res));
      }

      debug(`${Animal.find('/animal')}`);
      Animal.find()
        .then(animals => animals.map(a => a._id)) //will map, so each becomes just a thing of IDs
        .then(animal => res.status(200).json(animal))
        .catch(err => errorHandler(err, res));
    })

    .post(bodyParser, (req, res) => {
      debug(`${req.method}: ${req.url}`);
      new Animal(req.body).save()
        .then(animal => res.status(201).json(animal))
        .catch(err => errorHandler(err, res));
    })

    .put(bodyParser, (req, res) => {
      debug(`${req.method}: ${req.url}`);
      debug(`${req.body}`);
      Animal.findByIdAndUpdate(req.params._id, req.body, { upsert: true, runValidators: true }) //can pass options as 3rd argument
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
      // {UPSERT: TRUE} will allow for thing to be updated in case the property has been deleted or something
      // RUNVALIDATORS will run through && validate against your schema to check that all data is valid
      // Animal.findByIdAndUpdate(req.params._id, req.body, {upsert: true, runValidators: true, new: true})
      // ^^^ if new not set to true, will just hand back req.body 

      // .then(animal => res.status(200).json(animal)) /// b/c allowing potentiality of creating a new record
      // ^^^ SHOULD prolly be a conditional. if sent back, 201, if nothing upserted, send 204

      // .then(animal => {
      //  animal ? res.status(201).json(animal) : res.sendStatus(204)
      // })
    })
    
    .delete ((req, res) => {
      debug(`${req.method}: ${req.url}`);
      if (!req.params._id) errorHandler(new Error('Validation Error: ID is required to find the record you wish to delete'), res);
      Animal.findById(req.params._id)
        .then(animal => animal.remove())
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    });
};
