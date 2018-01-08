import Util from '../shared/Util';

export default class ReportValidation {
  /**
   * Validate creation of report
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static createValidation(req, res, next) {
    const body = req.body;

    if (!body.name || body.name.length < 7 || body.name.split('').length < 2) {
      res.status(400).send({ message: 'Name is invalid. It cannot be empty and should contain first and last name.' });
    } else if (!body.email || !Util.isEmailValid(body.email)) {
      res.status(400).send({ message: 'Email is invalid.' });
    } else if (!body.title || body.title.length < 5) {
      res.status(400).send({ message: 'Title is invalid. It cannot be empty or less than 5 characters.' });
    } else if (!body.content || body.content.length < 10) {
      res.status(400).send({ message: 'Content is invalid. It cannot be empty or less than 10 characters.' });
    } else {
      next();
    }
  }
}