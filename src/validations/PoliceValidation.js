export default class PoliceValidations {

  /**
   * Validate the information being sent it
   * for police creation.
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
}