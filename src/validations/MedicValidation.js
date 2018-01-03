import Util from '../shared/Util';

export default class MedicValidation {
  /**
   * Validate Create Request
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static createValidation(req, res, next) {
    const body = req.body;

    if (!body.name || body.name.length < 3) {
      res.status(400).send({ message: 'Name is invalid. Cannot be less than 3 or empty.' });
    } else if (!body.location || !body.location.address || !body.location.coordinates[0] || !body.location.coordinates[1]) {
      res.status(400).send({ message: 'Location is invalid. Must have an address, longitude and latitude.' });
    } else if (!body.mobile || body.mobile.length === 0) {
      res.status(400).send({ message: 'Mobile is invalid. Must have atleast one number.' });
    } else if (!body.services || body.services.length === 0) {
      res.status(400).send({ message: 'Services is invalid. Must have at least one service provided.' });
    } else {
      next();
    }
  }

  /**
   * Validate Update Request
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static updateValidation(req, res, next) {
    const body = req.body;

    if ('name' in body && body.name.length < 3) {
      res.status(400).send({ message: 'Name is invalid. Cannot be less than 3 or empty.' });
    } else if ('location' in body && (!body.location.address || !body.location.coordinates[0] || !body.location.coordinates[1])) {
      res.status(400).send({ message: 'Location is invalid. Must have an address, longitude and latitude.' });
    } else if ('area' in body && body.area.length < 3) {
      res.status(400).send({ message: 'Area is invalid. Cannot be less than 3 or empty.' });
    } else if ('mobile' in body && body.mobile.length === 0) {
      res.status(400).send({ message: 'Mobile is invalid. Must have atleast one number.' });
    } else if ('email' in body && !Util.isEmailValid(body.email)) {
      res.status(400).send({ message: 'Email is invalid.' });
    } else if ('website' in body && !Util.isWebsiteValid(body.website)) {
      res.status(400).send({ message: 'Website is invalid.' });
    } else if ('services' in body && body.services.length === 0) {
      res.status(400).send({ message: 'Services is invalid. Must have at least one service provided.' });
    } else {
      next();
    }
  }
}