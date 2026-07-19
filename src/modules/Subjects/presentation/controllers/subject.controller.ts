import BaseController from '@/base/Presentation/Controller/baseController';
import type { ControllerConfig } from '@/base/Presentation/Controller/baseController';
import SubjectRepository from '../../data/repositories/subject.repository';
import type StageModel from '@/modules/Stages/core/models/stage.model';
import type { DataState } from '@/base/Core/NetworkStructure/Resources/dataState/dataState';
import type Params from '@/base/Core/Params/params';

export default class SubjectController extends BaseController<StageModel, StageModel[]> {
  private static instance: SubjectController;

  protected get repository() {
    return SubjectRepository.getInstance();
  }

  protected get config(): ControllerConfig {
    return {
      showLoadingDialog: false,
      showSuccessDialog: false,
      showErrorDialog: false,
      showErrorTosat: true,
      showSuccessTosat: true,
      autoRetry: false,
      maxAutoRetries: 1,
    };
  }

  private constructor() {
    super();
  }

  static getInstance(): SubjectController {
    if (!SubjectController.instance) {
      SubjectController.instance = new SubjectController();
    }
    return SubjectController.instance;
  }

  deleteBranch(params: Params): Promise<DataState<void> | undefined> {
    const result = this.repository.deleteBranch(params);
    return result;
  }

  indexSubjects(params: Params): Promise<DataState<StageModel[]> | undefined> {
    const result = this.repository.indexSubjects(params);
    return result;
  }
}
