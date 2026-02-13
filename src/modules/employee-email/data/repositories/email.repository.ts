import BaseRepository from "@/base/Domain/Repositories/baseRepository";
import EmailModel from "../../core/models/email.model";
import EmailApiService from "../api/email.api-service";
import type { DataState } from "@/base/Core/NetworkStructure/Resources/dataState/dataState";
import type Params from "@/base/Core/Params/params";
import { DataFailed } from "@/base/Core/NetworkStructure/Resources/dataState/dataState";

/**
 * Email Repository for API data operations
 * 
 * This repository handles all data access for employee emails,
 * including parsing API responses and error handling.
 */
export default class EmailRepository extends BaseRepository<
  EmailModel,
  EmailModel[]
> {
  private static instance: EmailRepository;

  protected get apiService() {
    return EmailApiService.getInstance();
  }

  /**
   * Get singleton instance
   * @returns EmailRepository instance
   */
  static getInstance(): EmailRepository {
    if (!EmailRepository.instance) {
      EmailRepository.instance = new EmailRepository();
    }
    return EmailRepository.instance;
  }

  /**
   * Parse a single email item from API response
   * @param data - Raw API response data
   * @returns EmailModel instance
   * @throws Error if data is invalid
   */
  protected parseItem(data: any): EmailModel {
    try {
      return EmailModel.fromJson(data);
    } catch (error) {
      throw new Error(`Failed to parse email data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Parse list of email items from API response
   * @param data - Raw API response data (array)
   * @returns Array of EmailModel instances
   */
  protected parseList(data: any): EmailModel[] {
    return data.map((item: any) => this.parseItem(item));
  }

  
}
