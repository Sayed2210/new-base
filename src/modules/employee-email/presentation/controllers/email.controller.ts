import BaseController from "@/base/Presentation/Controller/baseController";
import type { ControllerConfig } from "@/base/Presentation/Controller/baseController";
import EmailModel from "../../core/models/email.model";
import EmailRepository from "../../data/repositories/email.repository";
import type { DataState } from "@/base/Core/NetworkStructure/Resources/dataState/dataState";
import { EmailType } from "../../core/constants/emailType.enum";

/**
 * Email Controller for managing employee emails
 * 
 * This controller provides methods for CRUD operations on employee emails
 * and specialized queries like fetching emails by employee or type.
 */
export default class EmailController extends BaseController<
  EmailModel,
  EmailModel[]
> {
  private static instance: EmailController;

  protected get repository() {
    return EmailRepository.getInstance();
  }

  /**
   * Controller configuration
   * Defines behavior for loading, success, and error dialogs
   */
  protected get config(): ControllerConfig {
    return {
      showLoadingDialog: false,
      showSuccessDialog: true,
      showErrorDialog: true,
      autoRetry: false,
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
  static getInstance(): EmailController {
    if (!EmailController.instance) {
      EmailController.instance = new EmailController();
    }
    return EmailController.instance;
  }

  /**
   * Fetch all emails for a specific employee
   * @param employeeId - Employee ID
   * @returns DataState with list of employee emails
   */
  async fetchEmployeeEmails(employeeId: number): Promise<DataState<EmailModel[]>> {
    return this.fetchList(undefined, {
      details: { employee_id: employeeId }
    });
  }

  /**
   * Fetch emails by type
   * @param type - Email type to filter by
   * @returns DataState with list of emails of specified type
   */
  async fetchEmailsByType(type: EmailType): Promise<DataState<EmailModel[]>> {
    return this.fetchList(undefined, {
      details: { type }
    });
  }

  /**
   * Fetch work emails for a specific employee
   * @param employeeId - Employee ID
   * @returns DataState with list of work emails
   */
  async fetchEmployeeWorkEmails(employeeId: number): Promise<DataState<EmailModel[]>> {
    return this.fetchList(undefined, {
      details: {
        employee_id: employeeId,
        type: EmailType.WORK
      }
    });
  }

  /**
   * Fetch personal emails for a specific employee
   * @param employeeId - Employee ID
   * @returns DataState with list of personal emails
   */
  async fetchEmployeePersonalEmails(employeeId: number): Promise<DataState<EmailModel[]>> {
    return this.fetchList(undefined, {
      details: {
        employee_id: employeeId,
        type: EmailType.PERSONAL
      }
    });
  }
}
