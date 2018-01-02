import Medic from '../models/Medic';

export default class MedicController {

  /**
   * Logic for creating a medical center
   * @param {*} req 
   * @param {*} res 
   */
  static create(req, res) {
    const body = req.body;

    Medic.findOne({ $or: [
      { name: body.name },
      { email: body.email }
    ]}, (err, center) => {
      /* istanbul ignore if */
      if (err) {
        res.status(500).send(err);
      } else if (center) {
        res.status(409).send({ message: 'Medical center already exists.' });
      } else {
        center = new Medic({
          name: body.name,
          location: body.location,
          area: body.area,
          state: body.state,
          mobile: body.mobile,
          email: body.email,
          website: body.website,
          services: body.services
        });

        center.save((err) => {
          /* istanbul ignore if */
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(201).send(center);
          }
        });
      }
    });
  }
}