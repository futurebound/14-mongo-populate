'use strict';

const faker = require('faker');
const superagent = require('superagent');
const Animal = require('../../model/animal');
const server = require('../../lib/server');
const errorHandler = require('../../lib/error-handler');
require('jest');

describe('#animal-delete.test.js', function () {
  beforeAll(() => this.basePath = `:${process.env.PORT}/api/v1/animal`);
  beforeAll(() => this.mockAnimal  = {name: 'lemongrab', isMammal: true, legs: 5});
    // {name: faker.hacker.ingverb(),
    // isMammal: faker.random.boolean(),
    // legs: faker.random.number()}
  beforeAll(() => server.start());
  afterAll(() => server.stop());
  afterAll(() => Promise.all([Animal.remove()]));

  describe('Valid request/response', () => {
    beforeAll(() => {
      return superagent.post(this.basePath)
        .send(this.mockAnimal)
        .then(res => this.response = res);
        // .catch(err => errorHandler(err));
    });

    it('should DELETE a student with ID, respond with status 204', () => {
      return superagent.delete(`${this.basePath}/${this.response.body._id}`)
        // .then(res => this.response = res)
        .then(res => {
          expect(res.status).toBe(204);
        })
        .catch(err => errorHandler(err));
    });

    it('should return a 400 given malformed id', () => {
      return superagent.delete(`${this.basePath}/22094803177901`)
        // .then(res => this.response = res)
        .catch(err => {
          expect(err.status).toBe(400);
          console.log(err.message);
        });
    });

    it('should respond with status 404 when trying to get a deleted record', () => {
      return superagent.get(`${this.basePath}/${this.response.body._id}`)
        // .then(res => this.response = res)
        .catch(err => {
          expect(err.status).toBe(404);
          // errorHandler(err);
        });
    });
  });

  // describe('Invalid request/response', () => {
  //   beforeAll(() => {
  //     this.testStudent = { name: 'ooga', city: 'booga' }; //may lift this up into outer describe block so available, more readable even tho testStudent availabe in lower describe block for invalid req/res
  //     return superagent.post(':4001/api/v1/student')
  //       .send(this.testStudent)
  //       .then(res => this.response = res)
  //       .catch(err => errorHandler(err));
  //   });

  //   it('should fail to DELETE a student with malformed ID/path, respond with status 404', () => {
  //     return superagent.delete(`:4001/api/v1/student/2767216481276`)
  //       .then(res => this.response = res)
  //       .catch(err => {
  //         // errorHandler(err);
  //         expect(err.status).toBe(404);
  //       });
  //   });
  //   it('should fail to DELETE a student with malformed ID/path, respond with error message Not Found', () => {
  //     return superagent.delete(`:4001/api/v1/student/2767216481276`)
  //       .then(res => this.response = res)
  //       .catch(err => {
  //         // errorHandler(err);
  //         expect(err.message).toEqual('Not Found');
  //       });
  //   });
  // });
});