import Police from '../models/Police';

export default class PoliceController {
  /**
   * Create a police station
   * @param {*} req 
   * @param {*} res 
   */
  static create(req, res) {
    const body = req.body;

    Police.findOne({ $or: [
      { name: body.name },
      { email: body.email }
    ]}, (err, station) => {
      /* istanbul ignore if */
      if (err) {
        res.status(500).send(err);
      } else if (station) {
        res.status(409).send({ message: 'Police Station with email or name already exists.' });
      } else {
        station = new Police({
          name: body.name,
          location: {
            address: body.location.address,
            coordinates: [body.location.coordinates[0], body.location.coordinates[1]]
          },
          area: body.area,
          state: body.state,
          mobile: body.mobile,
          email: body.email
        });

        station.save((err) => {
          /* istanbul ignore if */
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(201).send(station);
          }
        });
      }
    });
  }

  /**
   * delete a station
   * @param {*} req 
   * @param {*} res 
   */
  static drop(req, res) {
    const id = req.params.id || req.body.id;

    Police.findByIdAndRemove(id, (err, station) => {
      if (err) {
        res.status(500).send(err);
      } else if (!station || station === null) {
        res.status(404).send({ message: 'Station does not exist.' });
      } else {
        res.status(200).send({ message: 'Station deleted.' });
      }
    });
  }

  /**
   * Get all police stations
   * @param {*} req 
   * @param {*} res 
   */
  static getAll(req, res) {
    Police.find({}, (err, stations) => {
      /* istanbul ignore if */
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(stations);
      }
    });
  }

  /**
   * Get one police station using
   * the object id.
   * @param {*} req 
   * @param {*} res 
   */
  static getOne(req, res) {
    const id = req.params.id || req.body.id;

    Police.findById(id, (err, station) => {
      /* istanbul ignore if */
      if (err) {
        res.status(500).send(err);
      } else if (!station) {
        res.status(404).send({ message: 'No such user exists.' });
      } else {
        res.status(200).send(station);
      }
    });
  }

  /**
   * Update police station information
   * @param {*} req 
   * @param {*} res 
   */
  static update(req, res) {
    const body = req.body;
    const id = req.params.id || req.body.id;

    Police.findById(id, (err, station) => {
      /* istanbul ignore if */
      if (err) {
        res.status(500).send(err);
      } else if (!station) {
        res.status(404).send({ message: 'Station does not exist.' });
      } else {
        ['name', 'location', 'area', 'state', 'mobile', 'email'].forEach((key) => {
          if (body[key]) {
            station[key] = body[key];
          }
        });

        station.save((err) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(200).send(station);
          }
        });
      }
    });
  }
};