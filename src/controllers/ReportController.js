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
}