import Util from '../shared/Util';

export default class PoliceValidations {

  /**
   * Validate the information being sent it
   * for police station creation.
   * @param {*} req 
   * @param {*} res 
   */
  static createValidation(req, res, next) {
    const body = req.body;

    if (!body.name || body.name.length < 6) {
      res.status(400).send({ message: 'Name is invalid, cannot be empty or less than 6 characters.' });
    } else if (!body.location || !body.location.coordinates[0] || !body.location.coordinates[1] || !body.location.address) {
      res.status(400).send({ message: 'Location is invalid, must have an address, longitude and latitude.' });
    } else if (!body.mobile || body.mobile.length < 1) {
      res.status(400).send({ message: 'Mobile is invalid, must have at least one number.' });
    } else {
      next();
    }
  }

  /**
   * Update station information update
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static updateValidation(req, res, next) {
    const body = req.body;

    if ('name' in body && body.name.length < 6) {
      res.status(400).send({ message: 'Name is invalid, cannot be empty or less than 6 characters.' });
    } else if ('location' in body && (!body.location.coordinates[0] || !body.location.coordinates[1] || !body.location.address)) {
      res.status(400).send({ message: 'Location is invalid, must have an address, longitude and latitude.' });
    } else if ('mobile' in body && body.mobile.length < 1) {
      res.status(400).send({ message: 'Mobile is invalid, must have at least one number.' });
    } else if ('area' in body && body.area.length < 3) {
      res.status(400).send({ message: 'Area is invalid, must be at least 3 characters.' });
    } else if ('email' in body && !Util.isEmailValid(body.email)) {
      res.status(400).send({ message: 'Email is invalid.' });
    } else {
      next();
    }
  }
}