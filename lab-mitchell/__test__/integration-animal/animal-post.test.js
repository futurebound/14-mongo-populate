// 'use strict';

// const server = require('../../lib/server');
// const superagent = require('superagent');
// require('jest');

// //can include let api = `:{port}/api/v1/student`

// describe('#student-post.test.js', function () {
//   beforeAll(() => server.start(4003, () => console.log(`listening on 4003`)));
//   afterAll(() => server.stop(() => console.log('stopping server')));

//   describe('Valid request/response', () => {
//     beforeAll(() => {
//       this.testStudent = {name: 'ooga', city: 'booga'}; //may lift this up into outer describe block so available, more readable even tho testStudent availabe in lower describe block for invalid req/res
//       return superagent.post(':4003/api/v1/student')
//         .send(this.testStudent)
//         .then(res => this.response = res);
//     });

//     it('should respond with a status of 201', () => {
//       expect(this.response.status).toBe(201);
//     });
//     it('should POST a new student with name, city, and ID properties', () => {
//       expect(this.response.body).toHaveProperty('name');
//       expect(this.response.body).toHaveProperty('city');
//       expect(this.response.body).toHaveProperty('_id');
//     });
//     it('should POST a new student with name "ooga" and city "booga"', () => {
//       expect(this.response.body.name).toEqual('ooga');
//       expect(this.response.body.city).toHaveProperty('booga');
//     });

//     //pattern match ID like last week
//     //validate headers break down into correct content type
//   });

//   describe('Invalid request/response', () => {
//     it('should return a status 404 on bad path', () => {
//       return superagent.post(':4003/api/v1/DNE')
//         .send(this.testStudent) //data gets parsed b4 404 error so if no title no content it responds way we want it to
//         .catch(err => {
//           expect(err.status).toBe(404);
//           expect(err.response.text).toMatch(/path error/i); //capitalization matters depending on how it was created in error-handling
//         });
//     });
//     it('should return a status 400 on bad request body', () => {
//       return superagent.post(':4003/api/v1/student')
//         .send({})
//         .catch(err => expect(err.status).toBe(400));
//     });
//   });
// });