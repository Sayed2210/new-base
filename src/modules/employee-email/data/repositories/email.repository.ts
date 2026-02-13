import BaseRepository from "@/base/Domain/Repositories/baseRepository";
import EmailModel from "../../core/models/email.model";
import EmailApiService from "../api/email.api-service";

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
    if (!Array.isArray(data)) return [];
    const results: EmailModel[] = [];
    for (const item of data) {
      try {
        results.push(this.parseItem(item));
      } catch {
        // Skip items that fail to parse
      }
    }
    return results;
  }

  
}
