import request from 'supertest';
import should from 'should';

import app from '../src/server';

describe('Police Controller', () => {
  it('should return a message when called', (done) => {
    request(app)
      .get('/test')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('Found a way');
        done();
    });
  });
});