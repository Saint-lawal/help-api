import should from 'should';
import supertest from 'supertest';

import app from '../src/server';

let mid;
const request = supertest(app);

describe('Medic Controller', () => {
  after((done) => {
    app.close();
    done();
  });

  describe('creation', () => {
    it('should return 400 when name is empty or has below 3 characters', (done) => {
      request
        .post('/v1/api/medic')
        .send({
          name: 'py',
          location: {
            address: 'Test Address, Some Street, Lagos.',
            coordinates: [6.333443, 3.578443]
          },
          area: 'test area',
          mobile: ['08011110000'],
          email: 'test@email.com',
          website: 'chai.com',
          services: ['dentistry', 'urology']                      
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('Name is invalid. Cannot be less than 3 or empty.');
          done();
        });
    });

    it('should return 400 when location is invalid', (done) => {
      request
        .post('/v1/api/medic')
        .send({
          name: 'Test Center',
          location: {
            coordinates: [6.333443]
          },
          area: 'test area',
          mobile: ['08011110000'],
          email: 'test@email.com',
          website: 'chai.com',
          services: ['dentistry', 'urology']                      
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('Location is invalid. Must have an address, longitude and latitude.');
          done();
        });
    });

    it('should return 400 when mobile is invalid', (done) => {
      request
        .post('/v1/api/medic')
        .send({
          name: 'Test Center',
          location: {
            address: 'Test Address, Some Street, Lagos.',
            coordinates: [6.333443, 3.578443]
          },
          area: 'test area',
          mobile: [],
          email: 'test@email.com',
          website: 'chai.com',
          services: ['dentistry', 'urology']                      
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('Mobile is invalid. Must have atleast one number.');
          done();
        });
    });

    it('should return 400 when services is invalid', (done) => {
      request
        .post('/v1/api/medic')
        .send({
          name: 'Test Center',
          location: {
            address: 'Test Address, Some Street, Lagos.',
            coordinates: [6.333443, 3.578443]
          },
          area: 'test area',
          mobile: ['08011110000'],
          email: 'test@email.com',
          website: 'chai.com',
          services: []                      
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('Services is invalid. Must have at least one service provided.');
          done();
        });
    });

    it('should return 201 when all requirements are met and center created', (done) => {
      request
        .post('/v1/api/medic')
        .send({
          name: 'Test Center',
          location: {
            address: 'Test Address, Some Street, Lagos.',
            coordinates: [6.333443, 3.578443]
          },
          area: 'test area',
          mobile: ['08011110000'],
          email: 'test@email.com',
          website: 'chai.com',
          services: ['dentistry', 'urology']                      
        })
        .end((err, res) => {
          res.status.should.equal(201);
          res.body.name.should.equal('test center');
          res.body.area.should.equal('test area');
          res.body.mobile.length.should.equal(1);
          res.body.services.length.should.equal(2);
          done();
        });
    });

    it('should return 409 when center already exists with the same name', (done) => {
      request
        .post('/v1/api/medic')
        .send({
          name: 'Test Center',
          location: {
            address: 'Test Address, Some Street, Lagos.',
            coordinates: [6.333443, 3.578443]
          },
          area: 'test area',
          mobile: ['08011110000'],
          email: 'test@email.com',
          website: 'chai.com',
          services: ['dentistry', 'urology']                      
        })
        .end((err, res) => {
          res.status.should.equal(409);
          res.body.message.should.equal('Medical center already exists.');
          done();
        });
    });

    it('should return 409 when center already exists with the same email', (done) => {
      request
        .post('/v1/api/medic')
        .send({
          name: 'Test Center 1',
          location: {
            address: 'Test Address, Some Street, Lagos.',
            coordinates: [6.333443, 3.578443]
          },
          area: 'test area',
          mobile: ['08011110000'],
          email: 'test@email.com',
          website: 'chai.com',
          services: ['dentistry', 'urology']                      
        })
        .end((err, res) => {
          res.status.should.equal(409);
          res.body.message.should.equal('Medical center already exists.');
          done();
        });
    });
  });

  describe('get', () => {
    describe('all', () => {
      it('should retreive all medical centers', (done) => {
        request
          .get('/v1/api/medic')
          .end((err, res) => {
            mid = res.body[0]._id;
            res.body.length.should.equal(1);
            done();
          });
      });
    });

    describe('one', () => {
      it('should return 404 when id is not found', (done) => {
        request
          .get('/v1/api/medic/5a465419e8451a07cbeb8bb5')
          .end((err, res) => {
            res.status.should.equal(404);
            res.body.message.should.equal('Medical Center does not exist.');
            done();
          });
      });

      it('should return center when id is valid', (done) => {
        request
          .get(`/v1/api/medic/${mid}`)
          .end((err, res) => {
            res.status.should.equal(200);
            res.body._id.should.equal(mid);
            res.body.name.should.equal('test center');
            done();
          });
      });
    });
  });

  describe('update', () => {
    it('should return 404 when id is not found', (done) => {
      request
        .put('/v1/api/medic/5a465419e8451a07cbeb8bb5')
        .send({
          name: 'Test Center',
          location: {
            address: 'Test Address, Some Street, Lagos.',
            coordinates: [6.333443, 3.578443]
          },
          area: 'test area',
          mobile: ['08011110000'],
          email: 'test@email.com',
          website: 'www.chai.com',
          services: ['dentistry', 'urology']   
        })
        .end((err, res) => {
          res.status.should.equal(404);
          res.body.message.should.equal('Medical Center does not exist.');
          done();
        });
    });

    it('should return 400 when name is invalid', (done) => {
      request
        .put('/v1/api/medic/5a465419e8451a07cbeb8bb5')
        .send({
          name: 'Te',
          location: {
            address: 'Test Address, Some Street, Lagos.',
            coordinates: [6.333443, 3.578443]
          },
          area: 'test area',
          mobile: ['08011110000'],
          email: 'test@email.com',
          website: 'chai.com',
          services: ['dentistry', 'urology']   
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('Name is invalid. Cannot be less than 3 or empty.');
          done();
        });
    });

    it('should return 400 when location is invalid', (done) => {
      request
        .put('/v1/api/medic/5a465419e8451a07cbeb8bb5')
        .send({
          name: 'Test Center 2',
          location: {
            address: 'Test Address, Some Street, Lagos.',
            coordinates: [6.333443]
          },
          area: 'test area',
          mobile: ['08011110000'],
          email: 'test@email.com',
          website: 'chai.com',
          services: ['dentistry', 'urology']   
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('Location is invalid. Must have an address, longitude and latitude.');
          done();
        });
    });

    it('should return 400 when area is invalid', (done) => {
      request
        .put('/v1/api/medic/5a465419e8451a07cbeb8bb5')
        .send({
          name: 'Test Center 2',
          location: {
            address: 'Test Address, Some Street, Lagos.',
            coordinates: [6.333443, 3.573092]
          },
          area: 'te',
          mobile: ['08011110000'],
          email: 'test@email.com',
          website: 'chai.com',
          services: ['dentistry', 'urology']   
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('Area is invalid. Cannot be less than 3 or empty.');
          done();
        });
    });

    it('should return 400 when mobile is invalid', (done) => {
      request
        .put('/v1/api/medic/5a465419e8451a07cbeb8bb5')
        .send({
          name: 'Test Center 2',
          location: {
            address: 'Test Address, Some Street, Lagos.',
            coordinates: [6.333443, 3.573092]
          },
          area: 'test area 2',
          mobile: [],
          email: 'test@email.com',
          website: 'chai.com',
          services: ['dentistry', 'urology']   
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('Mobile is invalid. Must have atleast one number.');
          done();
        });
    });

    it('should return 400 when email is invalid', (done) => {
      request
        .put('/v1/api/medic/5a465419e8451a07cbeb8bb5')
        .send({
          name: 'Test Center 2',
          location: {
            address: 'Test Address, Some Street, Lagos.',
            coordinates: [6.333443, 3.573092]
          },
          area: 'test area 2',
          mobile: ['08011110000'],
          email: 'test.com',
          website: 'www.chai.com',
          services: ['dentistry', 'urology']   
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('Email is invalid.');
          done();
        });
    });

    it('should return 400 when website is invalid', (done) => {
      request
        .put('/v1/api/medic/5a465419e8451a07cbeb8bb5')
        .send({
          name: 'Test Center 2',
          location: {
            address: 'Test Address, Some Street, Lagos.',
            coordinates: [6.333443, 3.573092]
          },
          area: 'test area 2',
          mobile: ['08011110000'],
          email: 'test@email.com',
          website: 'chai.com',
          services: ['dentistry', 'urology']   
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('Website is invalid.');
          done();
        });
    });

    it('should return 400 when services is invalid', (done) => {
      request
        .put('/v1/api/medic/5a465419e8451a07cbeb8bb5')
        .send({
          name: 'Test Center 2',
          location: {
            address: 'Test Address, Some Street, Lagos.',
            coordinates: [6.333443, 3.573092]
          },
          area: 'test area 2',
          mobile: ['08011110000'],
          email: 'test@email.com',
          website: 'www.chai.com',
          services: []   
        })
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.message.should.equal('Services is invalid. Must have at least one service provided.');
          done();
        });
    });

    it('should return 200 when all requirements are met', (done) => {
      request
        .put(`/v1/api/medic/${mid}`)
        .send({
          name: 'Test Center 2',
          location: {
            address: 'Test Address, Some Street, Lagos.',
            coordinates: [6.333443, 3.573092]
          },
          area: 'test area 2',
          mobile: ['08011110000'],
          email: 'test@email.com',
          website: 'www.chai.com',
          services: ['dentistry', 'urology', 'radiology']
        })
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.name.should.equal('test center 2');
          res.body.area.should.equal('test area 2');
          res.body.services.length.should.equal(3);
          done();
        });
    });
  });

  describe('drop', () => {
    it('should fail when an invalid id is provided', (done) => {
      request
        .delete('/v1/api/medic/djhdjh')
        .end((err, res) => {
          res.status.should.equal(500);
          res.body.name.should.equal('CastError');
          done();
        });
    });

    it('should fail when an id for unknown document is provided', (done) => {
      request
        .delete('/v1/api/medic/5a465419e8451a07cbeb8bb5')
        .end((err, res) => {
          res.status.should.equal(404);
          res.body.message.should.equal('Medical Center does not exist.');
          done();
        });
    });

    it('should delete center when a valid id is provided', (done) => {
      request
        .delete(`/v1/api/medic/${mid}`)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.message.should.equal('Medical Center deleted.');
          done();
        });
    });
  });
});