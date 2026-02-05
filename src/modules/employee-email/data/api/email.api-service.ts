import BaseApiService from "@/base/Data/ApiService/baseApiService";
import type { ApiEndpoints } from "@/base/Data/ApiService/baseApiService";
import { ApiNames } from "@/base/Core/NetworkStructure/apiNames";

/**
 * Email API Service for employee email operations
 */
export default class EmailApiService extends BaseApiService {
    private static instance: EmailApiService;

    private apiNames = ApiNames.instance;

    protected get endpoints(): ApiEndpoints {
        return {
            index: this.apiNames.IndexMail,
            show: (id: string | number) => `${this.apiNames.ShowMail}/${id}`,
            create: this.apiNames.AddMail,
            update: (id: string | number) => `${this.apiNames.EditMail}/${id}`,
            delete: (id: string | number) => `${this.apiNames.DeleteMail}/${id}`,
        };
    }

    /**
     * Singleton instance
     */
    static getInstance(): EmailApiService {
        if (!EmailApiService.instance) {
            EmailApiService.instance = new EmailApiService();
        }
        return EmailApiService.instance;
    }
}
