import Report from '../models/Report';

export default class ReportController {

  /**
   * Create a report
   * @param {*} req 
   * @param {*} res 
   */
  static create(req, res) {
    const body = req.body;

    const report = new Report({
      name: body.name,
      email: body.email,
      webpage: body.webpage,
      title: body.title,
      content: body.content,
      file: body.file
    });

    report.save((err) => {
      /* istanbul ignore if */
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(report);
      }
    });
  }

  /**
   * Retreive all reports
   * @param {*} req 
   * @param {*} res 
   */
  static read(req, res) {
    Report.find({}, (err, reports) => {
      /* istanbul ignore if */
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(reports);
      }
    });
  }

  /**
   * Retreive one report using it's id
   * @param {*} req 
   * @param {*} res 
   */
  static readOne(req, res) {
    const id = req.params.id || req.body.id;

    Report.findById(id, (err, report) => {
      /* istanbul ignore if */
      if (err) {
        res.status(500).send(err);
      } else if (!report) {
        res.status(404).send({ message: 'Report does not exist.' });
      } else {
        res.status(200).send(report);
      }
    });
  }
}