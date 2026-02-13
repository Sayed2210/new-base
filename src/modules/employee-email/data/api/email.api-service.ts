import BaseApiService from "@/base/Data/ApiService/baseApiService";
import type {
  ApiEndpoints,
  ApiResponse,
} from "@/base/Data/ApiService/baseApiService";
import { ApiNames } from "@/base/Core/NetworkStructure/apiNames";
import type Params from "@/base/Core/Params/params";

export default class EmailApiService extends BaseApiService {
  private static instance: EmailApiService;

  private apiNames = ApiNames.instance;

  /**
   * Singleton instance
   */
  static getInstance(): EmailApiService {
    if (!EmailApiService.instance) {
      EmailApiService.instance = new EmailApiService();
    }
    return EmailApiService.instance;
  }

  protected get endpoints(): Partial<ApiEndpoints> {
    return {
      index: this.apiNames.IndexMail,
      show: this.apiNames.ShowMail,
      create: this.apiNames.AddMail,
      update: this.apiNames.EditMail,
      delete: this.apiNames.DeleteMail,      
    };
  }

  executeEmailAction(params: Params): Promise<ApiResponse> {
    return this.customPost(this.endpoints.create || "", params);
  }
}
