'use strict';

const mongoose = require('mongoose');

const Mammal = mongoose.Schema({
  'warmBlooded': { type: Boolean, require: true },
  'animals': [{ type: mongoose.Schema.Types.ObjectId, ref: 'animal' }],
}, { timestamps: true });

module.exports = mongoose.model('mammal', Mammal);