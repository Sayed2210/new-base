import BaseController from '@/base/Presentation/Controller/baseController';
import type { ControllerConfig } from '@/base/Presentation/Controller/baseController';
import type { ApiCallOptions } from '@/base/Data/ApiService/baseApiService';
import type Params from '@/base/Core/Params/params';
import {
  type DataState,
  DataSuccess,
} from '@/base/Core/NetworkStructure/Resources/dataState/dataState';
import { useFormsStore } from '@/stores/formsStore';
import EducationSubjectRepository from '@/modules/EducationClassification/data/repositories/educationSubject/education.subject.repository';
import type EducationSubjectConfigurationModel from '@/modules/EducationClassification/core/models/EducationConfiguration/education.subject.configuration.model';
import type AddEducationSubjectParams from '@/modules/EducationClassification/core/params/EducationSubjects/add.educationSubject.params';
import { dialogManager } from '@/base/Presentation/Dialogs/dialog.manager';

export default class EducationSubjectController extends BaseController<
  EducationSubjectConfigurationModel,
  EducationSubjectConfigurationModel[]
> {
  private static instance: EducationSubjectController;

  protected get repository() {
    return EducationSubjectRepository.getInstance();
  }

  /**
   * Controller configuration
   * Defines behavior for loading, success, and error dialogs
   */
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

  /**
   * Get singleton instance
   * @returns CountryController instance
   */
  static getInstance(): EducationSubjectController {
    if (!EducationSubjectController.instance) {
      EducationSubjectController.instance = new EducationSubjectController();
    }
    return EducationSubjectController.instance;
  }

  async create(params: AddEducationSubjectParams, options?: ApiCallOptions, formKey?: string) {
    const FormStore = useFormsStore();
    const hasEmptyTranslation = params.branches.some((branch) => {
      const singular = branch.translation?.PluralTitle ?? {};
      const plural = branch.translation?.SingularTitle ?? {};

      return (
        Object.values(singular).some((value) => !value?.trim()) ||
        Object.values(plural).some((value) => !value?.trim()) ||
        Object.keys(singular).length < 1 ||
        Object.keys(plural).length < 1
      );
    });
    // console.log(params, 'params');
    if (params.branches.length < 1) {
      dialogManager.toastWarning('Please add at least one branch');
      return;
    }
    if (hasEmptyTranslation) {
      dialogManager.toastWarning('Please add all translations for each branch');
      return;
    }

    const result = await super.create(params, { ...options, useJson: true });
    if (result instanceof DataSuccess) {
      // router.push({ name: 'EducationClassifications' });
      if (formKey) {
        FormStore.clearFormData(formKey);
      }
    }
    return result;
  }
  async fetchList(
    params?: Params & { isLocale?: boolean },
    options?: ApiCallOptions,
  ): Promise<DataState<EducationSubjectConfigurationModel[]>> {
    const result = await super.fetchList(params, {
      ...options,
      useJson: true,
      headers: {
        'accept-language': params?.isLocale ? 'en' : '*',
      },
    });
    return result;
  }
}
