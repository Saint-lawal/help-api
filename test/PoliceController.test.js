import request from 'supertest';
import should from 'should';

import app from '../src/server';

describe('Police Controller', () => {
  describe('creation', () => {
    it('should return 400 when name is empty', (done) => {
      request(app)
        .post('/api/police')
        .send({
          name: 'ty',
          location: {
            address: 'Test Address, Some Street, Lagos.',
            coordinates: [6.333443, 3.578443]
          },
          area: 'test area',
          mobile: ['08011110000'],
          email: ['test@email.com']
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('Name is invalid, cannot be empty or less than 6 characters.');
          done();
      });
    });

    it('should return 400 when location is invalid', (done) => {
      request(app)
        .post('/api/police')
        .send({
          name: 'Test Division',
          location: {
            address: 'Test Address, Some Street, Lagos.',
            coordinates: [6.333443]
          },
          area: 'test area',
          mobile: ['08011110000'],
          email: ['test@email.com']
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('Location is invalid, must have an address, longitude and latitude.');
          done();
      });
    });

    it('should return 400 when no mobile number is provided', (done) => {
      request(app)
        .post('/api/police')
        .send({
          name: 'Test Division',
          location: {
            address: 'Test Address, Some Street, Lagos.',
            coordinates: [6.333443, 3.578443]
          },
          area: 'test area',
          mobile: [],
          email: ['test@email.com']
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('Mobile is invalid, must have at least one number.');
          done();
      });
    });

    it('should return 201 when it meets all basic requirements', (done) => {
      request(app)
        .post('/api/police')
        .send({
          name: 'Test Division',
          location: {
            address: 'Test Address, Some Street, Lagos.',
            coordinates: [6.333443, 3.578443]
          },
          area: 'test area',
          mobile: ['08022220000'],
          email: ['test@email.com']
        })
        .end((err, res) => {
          res.status.should.equal(201);
          res.body.message.should.equal('Created Successfully.');
          done();
      });
    });
  });
});