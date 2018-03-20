'use strict';

const errorHandler = require('../../lib/error-handler');
require('jest');

describe('#error-handler.js', function () {
  let Res = class { //creates a fake response object since we are unit testing and not actually getting one from app
    constructor(error) {
      this.error = error; //holds the error object in its entirety
      this.message = null; //reassigned when res.send() is triggered with given message
      this.code = null; //reassigned when res.status() is triggered with given error code 
    }
    send(msg) { //has to be same name as in the error-handler.js file e.g. res.status.SEND
      this.message = msg;
      return this; //return this allows you to chain the methods, like promise.then()
    }
    status(code) { //has to be same name as in the error-handler.js file e.g. res.STATUS.send
      this.code = code;
      return this; //return this allows you to chain the methods, like promise.then()
    }
  };


  let validationError = new Res(new Error('Validation Error'));
  let pathError = new Res(new Error('Path Error'));
  let enoentError = new Res(new Error('ENOENT'));
  let objectIdError = new Res(new Error('ObjectID Failed'));
  let duplicateError = new Res(new Error('Duplicate Key'));
  let defaultError = new Res(new Error('radaradarada'));

  describe('different error code/message validations', () => {
    it('should return 400 code for validation error', () => {
      expect(errorHandler(validationError.error, validationError).code).toBe(400);
    });
    it('should return validation error message', () => {
      expect(errorHandler(validationError.error, validationError).message).toEqual('Error: Validation Error');
    });

    it('should return 404 code for path error', () => {
      expect(errorHandler(pathError.error, pathError).code).toBe(404);
    });
    it('should return path error message', () => {
      expect(errorHandler(pathError.error, pathError).message).toEqual('Error: Path Error');
    });

    it('should return 404 code for enoent error', () => {
      expect(errorHandler(enoentError.error, enoentError).code).toBe(404);
    });
    it('should return validation error message', () => {
      expect(errorHandler(enoentError.error, enoentError).message).toEqual('Error: ENOENT');
    });

    it('should return 404 code as default error', () => {
      expect(errorHandler(objectIdError.error, defaultError).code).toBe(404);
    });
    it('should return objectID failed error message', () => {
      expect(errorHandler(objectIdError.error, defaultError).message).toEqual('Error: ObjectID Failed');
    });

    it('should return 409 code as default error', () => {
      expect(errorHandler(duplicateError.error, defaultError).code).toBe(409);
    });
    it('should return duplicate key message', () => {
      expect(errorHandler(duplicateError.error, defaultError).message).toEqual('Error: Duplicate Key');
    });

    it('should return 500 code as default error', () => {
      expect(errorHandler(defaultError.error, defaultError).code).toBe(500);
    });
    it('should return default error message', () => {
      expect(errorHandler(defaultError.error, defaultError).message).toEqual('Error: radaradarada');
    });
  });
});