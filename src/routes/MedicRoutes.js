import MedicControllers from '../controllers/MedicController';
import MedicValidation from '../validations/MedicValidation';
import MedicController from '../controllers/MedicController';

export default class MedicRoutes {
  static routes(router) {
    router.route('/medic')
      .get(
        MedicController.getAll
      )
      .post(
        MedicValidation.createValidation,
        MedicController.create
      );

    router.route('/medic/:id')
      .get(
        MedicController.getOne
      );
  }
}