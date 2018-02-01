'use strict';

const mongoose = require('mongoose');

const Animal = mongoose.Schema({
  'name': { type: String, require: true },
  'isMammal': { type: Boolean, require: true }, //makes the field required, means body of request should have at least this
  'legs': { type: Number, require: true }, //makes the field required, means body of request should have at least this
}, { timestamps: true }); //adds createdAt && updatedAt properties

module.exports = mongoose.model('animals', Animal); //how we package up as SCHEMA that can have access to MongoDB
//pass in name of schema (animals) and schema (Animal)