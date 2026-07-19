import BaseController from '@/base/Presentation/Controller/baseController';
import type { ControllerConfig } from '@/base/Presentation/Controller/baseController';
import type { ApiCallOptions } from '@/base/Data/ApiService/baseApiService';
import type Params from '@/base/Core/Params/params';
import {
  type DataState,
  DataSuccess,
} from '@/base/Core/NetworkStructure/Resources/dataState/dataState';
import { useFormsStore } from '@/stores/formsStore';
import EducationConfigurationRepository from '@/modules/EducationClassification/data/repositories/educationConfiguration/education.configuration.repository';
import type EducationConfigurationModel from '@/modules/EducationClassification/core/models/EducationConfiguration/education.configuration.model';
import type AddEducationConfigurationParams from '@/modules/EducationClassification/core/params/EducationConfiguration/add.educationConfiguration.params';
import { dialogManager } from '@/base/Presentation/Dialogs/dialog.manager';

export default class EducationConfigurationController extends BaseController<
  EducationConfigurationModel,
  EducationConfigurationModel[]
> {
  private static instance: EducationConfigurationController;

  protected get repository() {
    return EducationConfigurationRepository.getInstance();
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
  static getInstance(): EducationConfigurationController {
    if (!EducationConfigurationController.instance) {
      EducationConfigurationController.instance = new EducationConfigurationController();
    }
    return EducationConfigurationController.instance;
  }

  async create(
    params: AddEducationConfigurationParams,
    options?: ApiCallOptions,
    formKey?: string,
  ) {
    const FormStore = useFormsStore();

    const hasEmptyTranslation = params.branches.some((branch) => {
      const singular = branch.translation?.PluralTitle ?? {};
      const plural = branch.translation?.SingularTitle ?? {};

      return (
        Object.values(singular).some((value) => !value?.trim()) ||
        Object.values(plural).some((value) => !value?.trim())
      );
    });
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

  async fetchOne(
    params: Params,
    options?: ApiCallOptions,
  ): Promise<DataState<EducationConfigurationModel>> {
    const result = super.fetchOne(params, options);
    return result;
  }

  async fetchList(
    params?: Params,
    options?: ApiCallOptions,
  ): Promise<DataState<EducationConfigurationModel[]>> {
    const result = super.fetchList(params, options);
    // console.log((await result).data, 'result');
    return result;
  }
}
