'use strict';

const Mammal = require('../model/mammal');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('http:route-mammal');

module.exports = function (router) {
  router.route('/mammal/:_id?')
    .get((req, res) => {
      debug(`${req.method}: ${req.url}`);
      if (req.params._id) {
        Mammal.findById(req.params._id)
          .then(mammal => res.status(200).json(mammal))
          .catch(err => errorHandler(err, res));
      //   ? res.status(200).json(mammal)
      //   : errorHandler(new Error('enoent'), res);
      //.json sets content to application/json then stringifies the raw object
      }

      debug(`${Mammal.find('/mammal')}`);
      Mammal.find()
        .then(mammals => mammals.map(a => ({ _id: a._id, name: a.name }))) //will map, so each becomes just a thing of IDs
        .then(mammal => res.status(200).json(mammal))
        .catch(err => errorHandler(err, res));
    })

    .post(bodyParser, (req, res) => {
      debug(`${req.method}: ${req.url}`);
      new Mammal(req.body).save()
        .then(mammal => res.status(201).json(mammal))
        .catch(err => errorHandler(err, res));
    })

    .put(bodyParser, (req, res) => {
      debug(`${req.method}: ${req.url}`);
      debug(`${req.body}`);
      Mammal.findByIdAndUpdate(req.params._id, req.body, { upsert: true, runValidators: true }) 
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    })

    .delete((req, res) => {
      debug(`${req.method}: ${req.url}`);
      Mammal.findByIdAndRemove(req.params._id)
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    });
};
