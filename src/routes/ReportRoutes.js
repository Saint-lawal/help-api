import ReportController from '../controllers/ReportController';
import ReportValidation from '../validations/ReportValidation';

export default class ReportRoutes {
  static routes(router) {
    router.route('/report')
      .post(
        ReportValidation.createValidation,
        ReportController.create
      );
  }
}