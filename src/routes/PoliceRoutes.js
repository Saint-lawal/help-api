import PoliceController from '../controllers/PoliceController';
import PoliceValidation from '../validations/PoliceValidation';

export default class PoliceRoutes {
  /**
   * Define all routes
   * @param {*} router 
   */
  static routes(router) {
    router.route('/police')
      .get(
        PoliceController.getAll
      )
      .post(
        PoliceValidation.createValidation,
        PoliceController.create
      );

    router.route('/police/:id')
      .get(
        PoliceController.getOne
      );
  }
}