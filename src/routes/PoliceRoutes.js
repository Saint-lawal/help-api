import PoliceController from '../controllers/PoliceController';

export default class PoliceRoutes {
  /**
   * Define all routes
   * @param {*} router 
   */
  static routes(router) {
    router.route('/test')
      .get(PoliceController.Test);
  }
}