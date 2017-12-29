import Police from '../models/Police';

export default class PoliceController {
  /**
   * Create a police station
   * @param {*} req 
   * @param {*} res 
   */
  static create(req, res) {
    const body = req.body;

    Police.findOne({
      name: body.name,
      mobile: {
        $in: body.mobile
      },
      email: {
        $in: body.email
      }
    }, (err, police) => {
      if (err) {
        res.status(500).send(err);
      } else if (police) {
        res.status(409).send({ message: 'Police Station already exists.' });
      } else {
        police = new Police({
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

        police.save((err) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(201).send({ message: 'Created Successfully.' });
          }
        });
      }
    });
  }
};