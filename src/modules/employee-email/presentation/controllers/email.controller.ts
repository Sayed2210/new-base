import BaseController from "@/base/Presentation/Controller/baseController";
import type { ControllerConfig } from "@/base/Presentation/Controller/baseController";
import EmailModel from "../../core/models/email.model";
import EmailRepository from "../../data/repositories/email.repository";

/**
 * Email Controller for managing employee emails
 */
export default class EmailController extends BaseController<EmailModel, EmailModel[]> {
    private static instance: EmailController;

    protected get repository() {
        return EmailRepository.getInstance();
    }

    /**
     * Controller configuration
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
     * Singleton instance
     */
    static getInstance(): EmailController {
        if (!EmailController.instance) {
            EmailController.instance = new EmailController();
        }
        return EmailController.instance;
    }

    /**
   * Fetch emails for a specific employee
   */
    async fetchEmployeeEmails(employeeId: number) {
        // You can create a custom params class for filtering by employee
        // For now, using the base fetchList with details (query params)
        return this.fetchList(undefined, {
            details: { employee_id: employeeId },
        });
    }
}
