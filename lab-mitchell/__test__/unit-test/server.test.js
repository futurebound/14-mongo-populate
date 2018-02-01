'use strict';

const server = require('../../lib/server');
require('jest');

describe('#server-test', () => {
  //can write as
  // beforeAll(server.start);
  // afterAll(server.stop);

  // beforeAll(() => server.start());
  // afterAll(() => server.stop());

  beforeEach(server.start);
  afterEach(server.stop);

  it('should return a promise rejection if the server is already running when started', () => {
    server.start()
      .catch(err => expect(err.message).toMatch(/server running/i)); // i is case insensitive in regex
  });

  it('should return a promise rejection if the server is already stopped when stopping', () => {
    server.stop()
      .then(server.stop)
      .then(err => expect(err.message).toMatch(/server not running/i));
  });
});