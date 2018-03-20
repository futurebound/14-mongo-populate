'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
// const errorHandler = require('../../lib/error-handler');
require('jest');

describe('#animal-put.test.js', function () {
  beforeAll(() => server.start(3003, () => console.log(`listening on 3003`)));
  afterAll(() => server.stop(() => console.log('stopping server')));

  describe('Valid request/respponse', () => {
    beforeAll(() => {
      this.testAnimal = { name: 'ooga', legs: 'booga' }; //may lift this up into outer describe block so available, more readable even tho testAnimal availabe in lower describe block for invalid req/res
      return superagent.post(':3003/api/v1/animal')
        .send(this.testAnimal)
        .then(res => this.response = res);
    });

    let testPut = { name: 'warga', legs: 2 };

    it('should PUT a new animal with name and legs, respond with 204', () => {
      return superagent.put(`:3003/api/v1/animal/${this.response.body._id}`)
        .send(testPut)
        .then(res => {
          expect(res.status).toBe(204);
        });
    });

    it('should GET the updated animal with updated parameter values', () => {
      return superagent.get(`:3003/api/v1/animal/${this.response.body._id}`)
        // .send(testPut)
        .then(res => {
          expect(res.body.name).toEqual('warga');
          expect(res.body.legs).toEqual(2);
        });
    });
  });

  describe('Invalid request/response', () => {
    beforeAll(() => {
      this.testAnimal = { name: 'ooga', legs: 'booga' }; //may lift this up into outer describe block so available, more readable even tho testAnimal availabe in lower describe block for invalid req/res
      return superagent.post(':3003/api/v1/animal')
        .send(this.testAnimal)
        .then(res => this.response = res);
    });

    it('should return a status 404 on bad path', () => {
      return superagent.put(`:3003/api/v1/animal/DNE`)
        // .send(testPut)
        .catch(err => {
          expect(err.status).toBe(404);
        });
    });
    it('should return a status 400 on bad request body', () => {
      return superagent.put(`:3003/api/v1/animal/${this.response.body._id}`)
        .send({})
        .catch(err => {
          expect(err.status).toBe(400);
        });
    });
  });
});