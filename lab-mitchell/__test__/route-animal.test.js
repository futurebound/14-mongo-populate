'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
const errorHandler = require('../lib/error-handler');
require('jest');

//can include let api = `:{port}/api/v1/student`

describe('#route-animal.test.js', function () {
  beforeAll(() => server.start(3000, () => console.log(`listening on 3000`)));
  afterAll(() => { 
    server.stop(() => console.log('stopping server'))
      .catch(err => errorHandler(err));
  });

  describe('Valid request/response', () => {
    beforeAll(() => {
      this.testAnimal = { name: 'lion', isMammal: true }; //may lift this up into outer describe block so available, more readable even tho testStudent availabe in lower describe block for invalid req/res
      return superagent.post(':3000/api/v1/animal')
        .send(this.testAnimal)
        .then(res => this.response = res)
        .catch(err => errorHandler(err));
    });

    afterAll(() => {
      return superagent.delete(':3000/api/v1/animal')
        .send(this.testAnimal._id)
        .then(res => this.response = res)
        .catch(err => errorHandler(err));
    });

    describe('Valid POST request', function() {
      it('should respond with a status of 201', () => {
        expect(this.response.status).toBe(201);
      });
      it('should respond with a status of 201', () => {
        expect(this.response.body).toHaveProperty('name');
        expect(this.response.body).toHaveProperty('isMammal');
        expect(this.response.body).toHaveProperty('legs');
      });
    });
    // it('should POST a new student with name, city, and ID properties', () => {
    //   expect(this.response.body).toHaveProperty('name');
    //   expect(this.response.body).toHaveProperty('city');
    //   expect(this.response.body).toHaveProperty('_id');
    // });
    // it('should POST a new student with name "ooga" and city "booga"', () => {
    //   expect(this.response.body.name).toEqual('ooga');
    //   expect(this.response.body.city).toHaveProperty('booga');
    // });

    //pattern match ID like last week
    //validate headers break down into correct content type
  });

  // describe('Invalid request/response', () => {
  //   it('should return a status 404 on bad path', () => {
  //     return superagent.post(':4003/api/v1/DNE')
  //       .send(this.testStudent) //data gets parsed b4 404 error so if no title no content it responds way we want it to
  //       .catch(err => {
  //         expect(err.status).toBe(404);
  //         expect(err.response.text).toMatch(/path error/i); //capitalization matters depending on how it was created in error-handling
  //       });
  //   });
  //   it('should return a status 400 on bad request body', () => {
  //     return superagent.post(':4003/api/v1/student')
  //       .send({})
  //       .catch(err => expect(err.status).toBe(400));
  //   });
  //   it()
  // });
});