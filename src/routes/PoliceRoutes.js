import PoliceController from '../controllers/PoliceController';
import PoliceValidation from '../validations/PoliceValidation';

export default class PoliceRoutes {
  /**
   * Define all routes
   * @param {*} router 
   */
  static routes(router) {
    router.route('/police')
      .post(
        PoliceValidation.createValidation,
        PoliceController.create
      );
  }
}