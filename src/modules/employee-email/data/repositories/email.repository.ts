import BaseRepository from "@/base/Domain/Repositories/baseRepository";
import EmailModel from "../../core/models/email.model";
import EmailApiService from "../api/email.api-service";
import type { DataState } from "@/base/Core/NetworkStructure/Resources/dataState/dataState";
import type Params from "@/base/Core/Params/params";

/**
 * Email Repository for API data operations
 */
export default class EmailRepository extends BaseRepository<EmailModel, EmailModel[]> {
    private static instance: EmailRepository;

    protected get apiService() {
        return EmailApiService.getInstance();
    }

    /**
     * Parse a single email item from API response
     */
    protected parseItem(data: any): EmailModel {
        return EmailModel.fromJson(data);
    }

    /**
     * Parse list of email items from API response
     */
    protected parseList(data: any): EmailModel[] {
        if (Array.isArray(data)) {
            return data.map((item) => EmailModel.fromJson(item));
        }
        return [];
    }

    async executeEmailAction(params: Params): Promise<DataState<EmailModel>> {
        return this.executeCustom(
            () => this.apiService.executeEmailAction(params),
            (data) => this.parseItem(data)
        );
    }



    /**
     * Singleton instance
     */
    static getInstance(): EmailRepository {
        if (!EmailRepository.instance) {
            EmailRepository.instance = new EmailRepository();
        }
        return EmailRepository.instance;
    }
}
