import MedicControllers from '../controllers/MedicController';
import MedicValidation from '../validations/MedicValidation';
import MedicController from '../controllers/MedicController';

export default class MedicRoutes {
  static routes(router) {
    router.route('/medic')
      .get(
        MedicController.read
      )
      .post(
        MedicValidation.createValidation,
        MedicController.create
      );

    router.route('/medic/:id')
      .get(
        MedicController.readOne
      )
      .put(
        MedicValidation.updateValidation,
        MedicController.update
      )
      .delete(
        MedicController.delete
      );
  }
}