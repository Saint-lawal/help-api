import should from 'should';
import supertest from 'supertest';

import app from '../src/server';

const request = supertest(app);

describe('Report', () => {
  after(() => {
    app.close();
  });

  describe('create', () => {
    describe
    it('should fail when an invalid name is provided', (done) => {
      request
        .post('/api/report')
        .send({
          name: 'Ta',
          email: 'test@email.com',
          webpage: 'www.testing.com',
          title: 'Test Title',
          content: 'This is to test out the features for report.',
          file: {
            format: '.jpeg',
            url: 'http://www.testurl.com'
          }
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('Name is invalid. It cannot be empty and should contain first and last name.');
          done();
        });
    });

    it('should fail when an invalid email is provided', (done) => {
      request
        .post('/api/report')
        .send({
          name: 'Test Name',
          email: 'email.com',
          webpage: 'www.testing.com',
          title: 'Test Title',
          content: 'This is to test out the features for report.',
          file: {
            format: '.jpeg',
            url: 'http://www.testurl.com'
          }
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('Email is invalid.');
          done();
        });
    });

    it('should fail when an invalid title is provided', (done) => {
      request
        .post('/api/report')
        .send({
          name: 'Test Name',
          email: 'test@email.com',
          webpage: 'www.testing.com',
          title: 'Tese',
          content: 'This is to test out the features for report.',
          file: {
            format: '.jpeg',
            url: 'http://www.testurl.com'
          }
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('Title is invalid. It cannot be empty or less than 5 characters.');
          done();
        });
    });

    it('should fail when an invalid content is provided', (done) => {
      request
        .post('/api/report')
        .send({
          name: 'Test Name',
          email: 'test@email.com',
          webpage: 'www.testing.com',
          title: 'Test title',
          content: 'This is.',
          file: {
            format: '.jpeg',
            url: 'http://www.testurl.com'
          }
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('Content is invalid. It cannot be empty or less than 10 characters.');
          done();
        });
    });

    it('should fail when an invalid title is provided', (done) => {
      request
        .post('/api/report')
        .send({
          name: 'Test Name',
          email: 'test@email.com',
          webpage: 'www.testing.com',
          title: 'obbery',
          content: 'This is to test out the features for report.',
          file: {
            format: '.jpeg',
            url: 'http://www.testurl.com'
          }
        })
        .end((err, res) => {
          res.status.should.equal(500);
          done();
        });
    });

    it('should pass when all valid required fields are provided', (done) => {
      request
        .post('/api/report')
        .send({
          name: 'Test Name',
          email: 'test@email.com',
          webpage: 'www.testing.com',
          title: 'armed-robbery',
          content: 'This is to test out the features for report.',
          file: {
            format: '.jpeg',
            url: 'http://www.testurl.com'
          }
        })
        .end((err, res) => {
          res.status.should.equal(201);
          res.body.name.should.equal('Test Name');
          res.body.file.format.should.equal('.jpeg');
          res.body.file.url.should.equal('http://www.testurl.com');
          done();
        });
    });
  });
});