import ReportController from '../controllers/ReportController';
import ReportValidation from '../validations/ReportValidation';

export default class ReportRoutes {
  static routes(router) {
    router.route('/report')
      .get(
        ReportController.read
      )
      .post(
        ReportValidation.createValidation,
        ReportController.create
      );

    router.route('/report/:id')
      .get(
        ReportController.readOne
      );
  }
}