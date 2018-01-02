import supertest from 'supertest';
import should from 'should';

import app from '../src/server';

let pid;

const request = supertest(app);

describe('Police Controller', () => {
  after((done) => {
    app.close();
    done();
  });

  describe('creation', () => {
    it('should return 400 when name is empty or has below 3 characters', (done) => {
      request
        .post('/api/police')
        .send({
          name: 'ty',
          location: {
            address: 'Test Address, Some Street, Lagos.',
            coordinates: [6.333443, 3.578443]
          },
          area: 'test area',
          mobile: ['08011110000'],
          email: 'test@email.com'
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('Name is invalid, cannot be empty or less than 6 characters.');
          done();
      });
    });

    it('should return 400 when location is invalid', (done) => {
      request
        .post('/api/police')
        .send({
          name: 'Test Division',
          location: {
            address: 'Test Address, Some Street, Lagos.',
            coordinates: [6.333443]
          },
          area: 'test area',
          mobile: ['08011110000'],
          email: 'test@email.com'
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('Location is invalid, must have an address, longitude and latitude.');
          done();
      });
    });

    it('should return 400 when no mobile number is provided', (done) => {
      request
        .post('/api/police')
        .send({
          name: 'Test Division',
          location: {
            address: 'Test Address, Some Street, Lagos.',
            coordinates: [6.333443, 3.578443]
          },
          area: 'test area',
          mobile: [],
          email: 'test@email.com'
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('Mobile is invalid, must have at least one number.');
          done();
      });
    });

    it('should return 201 when it meets all basic requirements', (done) => {
      request
        .post('/api/police')
        .send({
          name: 'Test Division',
          location: {
            address: 'Test Address, Some Street, Lagos.',
            coordinates: [6.333443, 3.578443]
          },
          area: 'test area',
          mobile: ['08022220000'],
          email: 'test@email.com'
        })
        .end((err, res) => {
          res.status.should.equal(201);
          res.body.name.should.equal('test division');
          res.body.area.should.equal('test area');
          res.body.mobile.length.should.equal(1);
          done();
      });
    });

    it('should return 409 when station with name already exists', (done) => {
      request
        .post('/api/police')
        .send({
          name: 'test division',
          location: {
            address: 'Test Address, Some Street, Lagos.',
            coordinates: [6.333443, 3.578443]
          },
          area: 'test area',
          mobile: ['08022220000'],
          email: 'test1@email.com'
        })
        .end((err, res) => {
          res.status.should.equal(409);
          res.body.message.should.equal('Police Station with email or name already exists.');
          done();
      });
    });

    it('should return 409 when station with email already exists', (done) => {
      request
        .post('/api/police')
        .send({
          name: 'Takwa Test',
          location: {
            address: 'Test Address, Some Street, Lagos.',
            coordinates: [6.333443, 3.578443]
          },
          area: 'test area',
          mobile: ['08022220000'],
          email: 'test@email.com'
        })
        .end((err, res) => {
          res.status.should.equal(409);
          res.body.message.should.equal('Police Station with email or name already exists.');
          done();
      });
    });
  });

  describe('get', () => {
    describe('all', () => {
      it('should get all stations in the database', (done) => {
        request
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
        request
          .get('/api/police/djhdjh')
          .end((err, res) => {
            res.status.should.equal(500);
            res.body.name.should.equal('CastError');
            done();
          });
      });

      it('should fail when an invalid id is provided', (done) => {
        request
          .get('/api/police/5a465419e8451a07cbeb8bb5')
          .end((err, res) => {
            res.status.should.equal(404);
            res.body.message.should.equal('No such user exists.');
            done();
          });
      });

      it('should pass when a valid id is provided', (done) => {
        request
          .get(`/api/police/${pid}`)
          .end((err, res) => {
            res.status.should.equal(200);
            res.body._id.should.equal(pid);
            done();
          });
      });
    });
  });

  describe('update', () => {
    it('should return 400 if name is invalid', (done) => {
      request
        .put(`/api/police/${pid}`)
        .send({
          name: 'tam'
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('Name is invalid, cannot be empty or less than 6 characters.');
          done();
        });
    });

    it('should return 400 if location provided is invalid', (done) => {
      request
        .put(`/api/police/${pid}`)
        .send({
          location: {
            coordinates: [6.333443, 3.578443]
          }
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('Location is invalid, must have an address, longitude and latitude.');
          done();
        });
    });

    it('should return 400 if area provided is invalid', (done) => {
      request
        .put(`/api/police/${pid}`)
        .send({
          area: 'te'
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('Area is invalid, must be at least 3 characters.');
          done();
        });
    });

    it('should return 400 if mobile provided is less than 1', (done) => {
      request
        .put(`/api/police/${pid}`)
        .send({
          mobile: []
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('Mobile is invalid, must have at least one number.');
          done();
        });
    });

    it('should return 400 if email provided is invalid', (done) => {
      request
        .put(`/api/police/${pid}`)
        .send({
          email: 'aaahh@dje'
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('Email is invalid.');
          done();
        });
    });

    it('should return 200 all requirements are met', (done) => {
      request
        .put(`/api/police/${pid}`)
        .send({
          email: 'another@email.com'
        })
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.email.should.equal('another@email.com');
          done();
        });
    });
  });

  describe('get', () => {
    describe('all', () => {
      it('should get all stations in the database', (done) => {
        request
          .get('/api/police')
          .end((err, res) => {
            res.status.should.equal(200);
            res.body.length.should.equal(1);
            pid = res.body[0]._id;
            done();
          });
      });
    });

    describe('delete', () => {
      it('should fail when an invalid id is provided', (done) => {
        request
          .delete('/api/police/djhdjh')
          .end((err, res) => {
            res.status.should.equal(500);
            res.body.name.should.equal('CastError');
            done();
          });
      });

      it('should fail when an invalid id is provided', (done) => {
        request
          .delete('/api/police/5a465419e8451a07cbeb8bb5')
          .end((err, res) => {
            res.status.should.equal(404);
            res.body.message.should.equal('Station does not exist.');
            done();
          });
      });

      it('should pass when a valid id is provided', (done) => {
        request
          .delete(`/api/police/${pid}`)
          .end((err, res) => {
            res.status.should.equal(200);
            res.body.message.should.equal('Station deleted.');
            done();
          });
      });
    });
  });
});