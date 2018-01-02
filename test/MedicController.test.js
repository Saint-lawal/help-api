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
        .post('/api/medic')
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
        .post('/api/medic')
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
        .post('/api/medic')
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
        .post('/api/medic')
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
        .post('/api/medic')
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
  });

  describe('get', () => {
    describe('all', () => {
      it('should retreive all medical centers', (done) => {
        request
          .get('/api/medic')
          .end((err, res) => {
            mid = res.body[0]._id;
            res.body.length.should.equal(1);
            done();
          });
      });
    });
  });
});