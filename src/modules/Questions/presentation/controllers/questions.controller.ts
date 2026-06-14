import BaseController from '@/base/Presentation/Controller/baseController';
import type { ControllerConfig } from '@/base/Presentation/Controller/baseController';
import type { ApiCallOptions } from '@/base/Data/ApiService/baseApiService';
import type Params from '@/base/Core/Params/params';
import { DataSuccess } from '@/base/Core/NetworkStructure/Resources/dataState/dataState';
import router from '@/router';
import { useFormsStore } from '@/stores/formsStore';
import type questionsModel from '../../core/models/questions.model';
import questionsRepository from '../../data/repositories/question.repository';
import type ShowQuestionsModel from '../../core/models/show.questions.model';
import type AddquestionsParams from '../../core/params/add.question.params';
import { dialogManager } from '@/base/Presentation/Dialogs/dialog.manager';
import { QuestionTypeEnum } from '../../core/constant/question.type.enum';

export default class questionsController extends BaseController<
  ShowQuestionsModel,
  questionsModel[]
> {
  private static instance: questionsController;

  protected get repository() {
    return questionsRepository.getInstance();
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

  static getInstance(): questionsController {
    if (!questionsController.instance) {
      questionsController.instance = new questionsController();
    }
    return questionsController.instance;
  }

  async create(params: AddquestionsParams, options?: ApiCallOptions, formKey?: string) {
    const FormStore = useFormsStore();
    
    if( (params.questionType === QuestionTypeEnum.mcq && params.answers?.filter((answer) => answer.isCorrect).length === 0) || 
  (params.questionType === QuestionTypeEnum.true_false && params.answers?.filter((answer) => answer.isCorrect).length === 0)){
      dialogManager.toastWarning("one or more answers should be correct");
      return;
    }

    const result = await super.create(params, { ...options, useJson: true });
    if (result instanceof DataSuccess) {
      router.push({ name: 'Questions' });
      if (formKey) {
        FormStore.clearFormData(formKey);
      }
    }
    return result;
  }

  async update(params: Params, options?: ApiCallOptions, formKey?: string) {
    const FormStore = useFormsStore();

    const result = await super.update(params, options);
    if (result instanceof DataSuccess) {
      router.push({ name: 'Questions' });
      if (formKey) {
        FormStore.clearFormData(formKey);
      }
    }
    return result;
  }
}
