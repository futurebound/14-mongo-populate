'use strict';

const faker = require('faker');
const Mammal = require('../../model/mammal');
const Animal = require('../../model/animal');

const mock = module.exports = {};

// Mammal Mocks - One, Many, RemoveAll
mock.mammal = {};

mock.mammal.createOne = () => new Mammal({ name: faker.hacker.adjective() }).save();

mock.mammal.createMany = n =>
  Promise.all(new Array(n).fill(0).map(mock.mammal.createOne));

mock.mammal.removeAll = () => Promise.all([Mammal.remove()]);


// Animal Mocks - One, Many, RemoveAll
mock.animal = {};

mock.animal.createOne = () => {
  let result = {};

  return mock.mammal.createOne()
    .then(mammal => {
      result.mammal = mammal;
      return new Animal({
        artist: `${faker.name.firstName()} ${faker.name.lastName()}`,
        title: faker.hacker.ingverb(),
        mammal: mammal._id.toString(),
      }).save();
    })
    .then(animal => result.animal = animal)
    .then(() => result);
};

mock.animal.createMany = n => {
  let result = {};

  return mock.mammal.createOne()
    .then(mammal => {
      result.mammal = mammal;
      let animalProms = new Array(n).fill(0).map(() => new Animal({
        artist: `${faker.name.firstName()} ${faker.name.lastName()}`,
        title: faker.hacker.ingverb(),
        mammal: mammal._id.toString(),
      }).save());
      return Promise.all(animalProms);
    })
    .then(animals => result.animals = animals)
    .then(() => result);
};

mock.animal.removeAll = () => Promise.all([Animal.remove()]);