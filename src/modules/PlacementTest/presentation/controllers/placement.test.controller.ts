import BaseController from '@/base/Presentation/Controller/baseController';
import type { ControllerConfig } from '@/base/Presentation/Controller/baseController';
import type PlcaementTestModel from '../../core/models/placement.test.model';
import type ShowPlcaementTestModel from '../../core/models/show.placement.test.model';
import PlacementTestRepository from '../../data/repositories/placement.test.repository';

export default class PlacementTestController extends BaseController<ShowPlcaementTestModel, PlcaementTestModel[]> {
  private static instance: PlacementTestController;

  protected get repository() {
    return PlacementTestRepository.getInstance();
  }

  protected get config(): ControllerConfig {
    return {
      showLoadingDialog: false,
      showSuccessDialog: false,
      showSuccessTosat: true,
      showErrorDialog: false,
      showErrorTosat: true,
      autoRetry: false,
      maxAutoRetries: 1,
    };
  }

  private constructor() {
    super();
  }

  static getInstance(): PlacementTestController {
    if (!PlacementTestController.instance) {
      PlacementTestController.instance = new PlacementTestController();
    }
    return PlacementTestController.instance;
  }


}
