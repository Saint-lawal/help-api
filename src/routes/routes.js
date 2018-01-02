import MedicRoutes from './MedicRoutes';
import PoliceRoutes from './PoliceRoutes';

export default class Router {

  /**
   * Register routes
   * @param {*} router 
   */
  static routes(router) {
    MedicRoutes.routes(router);
    PoliceRoutes.routes(router);
  };
}

