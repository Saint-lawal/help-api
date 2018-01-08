import Medic from '../models/Medic';

export default class MedicController {

  /**
   * Create a medical center
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

  /**
   * Delete a medical center
   * @param {*} req 
   * @param {*} res 
   */
  static delete(req, res) {
    const id = req.params.id || req.body.id;

    Medic.findByIdAndRemove(id, (err, center) => {
      /* istanbul ignore if */
      if (err) {
        res.status(500).send(err);
      } else if (!center || center === null) {
        res.status(404).send({ message: 'Medical Center does not exist.' });
      } else {
        res.status(200).send({ message: 'Medical Center deleted.' });
      }
    });
  }

  /**
   * Get all medical centers
   * @param {*} req 
   * @param {*} res 
   */
  static read(req, res) {
    Medic.find({}, (err, medics) => {
      /* istanbul ignore if */
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(medics);
      }
    });
  }

  /**
   * Get One medical center
   * @param {*} req 
   * @param {*} res 
   */
  static readOne(req, res) {
    const id = req.params.id || req.body.id;

    Medic.findById(id, (err, center) => {
      /* istanbul ignore if */
      if (err) {
        res.status(500).send(err);
      } else if (!center) {
        res.status(404).send({ message: 'Medical Center does not exist.' });
      } else {
        res.status(200).send(center);
      }
    });
  }

  /**
   * Update Medical Center
   * @param {*} req 
   * @param {*} res 
   */
  static update(req, res) {
    const body = req.body;
    const id = req.params.id || req.body.id;

    Medic.findById(id, (err, center) => {
      /* istanbul ignore if */
      if (err) {
        res.status(500).send(err);
      } else if (!center) {
        res.status(404).send({ message: 'Medical Center does not exist.' });
      } else {
        ['name', 'location', 'area', 'state', 'mobile', 'email', 'website', 'services'].forEach((key) => {
          if (body[key]) {
            center[key] = body[key];
          }
        });

        center.modifiedAt = new Date();
        center.save((err) => {
          /* istanbul ignore if */
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(200).send(center);
          }
        });
      }
    });
  }
}