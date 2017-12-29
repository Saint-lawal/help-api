import request from 'supertest';
import should from 'should';

import app from '../src/server';

let pid;

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
          res.body.name.should.equal('test division');
          res.body.area.should.equal('test area');
          res.body.mobile.length.should.equal(1);
          done();
      });
    });
  });

  describe('get', () => {
    describe('all', () => {
      it('should get all stations in the database', (done) => {
        request(app)
          .get('/api/police')
          .end((err, res) => {
            res.status.should.equal(200);
            res.body.length.should.equal(1);
            pid = res.body[0]._id;
            done();
          });
      });
    });

    describe('one', () => {
      it('should fail when an invalid id is provided', (done) => {
        request(app)
          .get('/api/police/djhdjh')
          .end((err, res) => {
            res.status.should.equal(500);
            res.body.name.should.equal('CastError');
            done();
          });
      });

      it('should pass when a valid id is provided', (done) => {
        request(app)
          .get(`/api/police/${pid}`)
          .end((err, res) => {
            res.status.should.equal(200);
            res.body._id.should.equal(pid);
            done();
          });
      });
    });
  });
});