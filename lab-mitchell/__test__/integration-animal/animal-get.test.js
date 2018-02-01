'use strict';

const server = require('../../lib/server');
const superagent = require('superagent');
const errorHandler = require('../../lib/error-handler');
require('jest');

describe('#GET /api/v1/student', function () {
  beforeAll(() => server.start(4002, () => console.log(`listening on 4002`)));
  afterAll(() => server.stop(() => console.log('stopping server')));

  describe('Valid request/response', () => {
    beforeAll(() => {
      this.testStudent = { name: 'ooga', city: 'booga' }; //may lift this up into outer describe block so available, more readable even tho testStudent availabe in lower describe block for invalid req/res
      return superagent.post(':4002/api/v1/student')
        .send(this.testStudent)
        .then(res => this.response = res)
        .catch(err => errorHandler(err));
    });

    afterAll(() => {
      return superagent.delete(`:4002/api/v1/student/${this.response.body._id}`)
        .catch(err => errorHandler(err));
    });

    it('should have successfully posted a student responding with status 201', () => {
      expect(this.response.status).toBe(201);
    });

    describe('GET one record', () => { //arrow so that the this. is block scoped, instead of function()
      it('should GET a student with specific ID, respond with status 200', () => {
        return superagent.get(`:4002/api/v1/student/${this.response.body._id}`)
          .then(res => this.response = res)
          .then(() => {
            expect(this.response.status).toBe(200);
          });
      });
      it('should GET a student with specific ID, have name, city, and _id properties', () => {
        return superagent.get(`:4002/api/v1/student/${this.response.body._id}`)
          .then(res => this.response = res)
          .then(() => {
            expect(this.response.body).toHaveProperty('name');
            expect(this.response.body).toHaveProperty('city');
            expect(this.response.body).toHaveProperty('_id');
          });
      });
      it('should GET a student with specific ID, have given name and city values', () => {
        return superagent.get(`:4002/api/v1/student/${this.response.body._id}`)
          .then(res => this.response = res)
          .then(() => {
            expect(this.response.body._id).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
            expect(this.response.body.name).toEqual('ooga');
            expect(this.response.body.city).toEqual('booga');
          });
      });
    });

    describe('GET all records', () => { //arrow so that the this. is block scoped, instead of function()
      it('should GET a student with specific ID, respond with status 200', () => {
        return superagent.get(`:4002/api/v1/student/`)
          .then(res => this.response = res)
          .then(() => {
            expect(this.response.status).toBe(200);
          });
      });
      it('should GET all ids, and return them in an array', () => {
        return superagent.get(`:4002/api/v1/student/`)
          .then(res => this.response = res)
          .then(() => { 
            this.response.body.map(i => {
              expect(i).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
            });
          });
      });
    });
  });

  describe('Invalid request/response', () => {
    beforeAll(() => {
      this.testStudent = { name: 'ooga', city: 'booga' }; //may lift this up into outer describe block so available, more readable even tho testStudent availabe in lower describe block for invalid req/res
      return superagent.post(':4002/api/v1/student')
        .send(this.testStudent)
        .then(res => this.response = res)
        .catch(err => errorHandler(err));
    });

    afterAll(() => {
      return superagent.delete(`:4002/api/v1/student/${this.response.body._id}`)
        .catch(err => errorHandler(err));
    });

    it('should have successfully posted a student responding with status 201', () => {
      expect(this.response.status).toBe(201);
    });

    describe('GET one record', () => {
      it('should fail to GET a student with malformed ID, respond with status 404', () => {
        return superagent.get(`:4002/api/v1/student/274`)
          .then(res => this.response = res)
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });
      it('should fail to GET a student with malformed ID, respond with error message Not Found', () => {
        return superagent.get(`:4002/api/v1/student/274`)
          .then(res => this.response = res)
          .catch(err => {
            expect(err.message).toEqual('Not Found');
          });
      });
    });

    describe('GET all records', () => {
      it('should fail to GET all students with malformed path, respond with status 404', () => {
        return superagent.get(`:4002/api/v1/studentsilo`)
          .then(res => this.response = res)
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });
      it('should fail to GET all students with malformed path, respond with error message Not Found', () => {
        return superagent.get(`:4002/api/v1/studentsilo`)
          .then(res => this.response = res)
          .catch(err => {
            expect(err.message).toEqual('Not Found');
          });
      });
    });
  });
});