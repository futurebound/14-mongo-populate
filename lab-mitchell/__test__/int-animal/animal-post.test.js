'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

//can include let api = `:{port}/api/v1/animal`

describe('#animal-post.test.js', function () {
  beforeAll(() => server.start(3000, () => console.log(`listening on 3000`)));
  afterAll(() => server.stop(() => console.log('stopping server')));

  describe('Valid request/response', () => {
    beforeAll(() => {
      this.testAnimal = { name: 'ronaldo', legs: 2 };
      return superagent.post(':3000/api/v1/animal')
        .send(this.testAnimal)
        .then(res => this.response = res);
    });

    it('should respond with a status of 201', () => {
      expect(this.response.status).toBe(201);
    });
    it('should POST a new animal with name, legs, and ID properties', () => {
      expect(this.response.body).toHaveProperty('name');
      expect(this.response.body).toHaveProperty('legs');
      expect(this.response.body).toHaveProperty('_id');
    });
    it('should POST a new animal with name "ronaldo" and 2 legs', () => {
      expect(this.response.body.name).toEqual('ronaldo');
      expect(this.response.body.legs).toEqual(2);
    });
  });

  describe('Invalid request/response', () => {
    it('should return a status 404 on bad path', () => {
      return superagent.post(':3000/api/v1/DNE')
        .send(this.testAnimal)
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });
    it('should return a status 400 on bad request body', () => {
      return superagent.post(':3000/api/v1/animal')
        .send({})
        .catch(err => {
          expect(err.status).toBe(400);
        });
    });
  });
});