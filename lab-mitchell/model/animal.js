'use strict';

const mongoose = require('mongoose');
const Mammal = require('../model/mammal');
const debug = require('debug')('http:model-animal');

const Animal = mongoose.Schema({
  'name': { type: String, require: true },
  'legs': { type: Number, require: true },
  'mammal': { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'mammal' },
}, { timestamps: true }); //adds createdAt && updatedAt properties


Animal.pre('save', function (next) {
  debug(`Animal.pre('save') ${Animal.mammal}`);
  Mammal.findById(this.mammal)
    .then(mammal => {
    // let trackIds = new Set(album.tracks)
    // trackIds.add(this._id)
    // album.tracks = [...trackIds]
      mammal.animals = [...new Set(mammal.animals).add(this._id)];
      Mammal.findByIdAndUpdate(this.mammal, { animals: mammal.animals });
      mammal.save();
    })
    .then(next)
    .catch(() => next(new Error('Validation Error. Failed to save Animal.')));
});

Animal.post('remove', function (doc, next) {
  debug(`Animal.post('delete') animal: ${Animal.name}`);
  Mammal.findById(doc.mammal)
    .then(mammal => {
      mammal.animals = mammal.animals.filter(a => doc._id.toString() !== a.toString());
      mammal.save();
    })
    .then(next)
    .catch(next);
});

module.exports = mongoose.model('animal', Animal); //how we package up as SCHEMA that can have access to MongoDB
//pass in name of schema (animals) and schema (Animal)