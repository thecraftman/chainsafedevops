/**
 * application backend
 * this is a simple application backend with a couple of routes
 *
 * don't spend time improving the code of this application since it's not part of the assessment
 *
 * 
 * 
 */

import supertest from 'supertest';
import app from '../src/app';

describe('GET /', () => {
  it('should return 404 Not Found status', done => {
    supertest(app).get('/404').expect(404, done)
  });

  it('should return JSON content-type', done => {
    supertest(app).get('/').expect('Content-Type', /json/).end(done);
  });
});

describe('GET /healthcheck', () => {
  it('should return 200 OK status', done => {
    supertest(app).get('/healthcheck').expect(200, done);
  });
});
