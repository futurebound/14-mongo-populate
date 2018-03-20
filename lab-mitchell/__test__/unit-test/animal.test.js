'use strict';

//from lecture, rider is mammal and bike is animal   

const Animal = require('../../model/animal');
const mocks = require('..lib/mocks');
require('jest');

describe('#Animal Unit', function() {
  describe('#Animal Schema', () => {
    this.mockAnimal = mocks.animal.createOne();
    let newAnimal = new Animal();
    
  });
});