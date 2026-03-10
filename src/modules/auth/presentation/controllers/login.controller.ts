import BaseController from "@/base/Presentation/Controller/baseController";
import type { ControllerConfig } from "@/base/Presentation/Controller/baseController";
import type LoginModel from "../../core/models/login.model";
import LoginRepository from "../../data/repositories/login.repository";
import type Params from "@/base/Core/Params/params";
import type { ApiResponse } from "@/base/Data/ApiService/apiServiceInterface";

/**
 * Email Controller for managing employee emails
 *
 * This controller provides methods for CRUD operations on employee emails
 * and specialized queries like fetching emails by employee or type.
 */
export default class LoginController extends BaseController<
  LoginModel,
  LoginModel[]
> {
  private static instance: LoginController;

  protected get repository() {
    return LoginRepository.getInstance();
  }

  /**
   * Controller configuration
   * Defines behavior for loading, success, and error dialogs
   */
  protected get config(): ControllerConfig {
    return {
      showLoadingDialog: true,
      showSuccessDialog: true,
      showErrorDialog: true,
      autoRetry: true,
      maxAutoRetries: 2,
    };
  }

  private constructor() {
    super();
  }

  /**
   * Get singleton instance
   * @returns EmailController instance
   */
  static getInstance(): LoginController {
    if (!LoginController.instance) {
      LoginController.instance = new LoginController();
    }
    return LoginController.instance;
  }

  async login(params: Params): Promise<ApiResponse> {
    return this.repository.login(params);
  }
}
