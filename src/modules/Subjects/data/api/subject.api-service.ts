import BaseApiService from '@/base/Data/ApiService/baseApiService';
import type { ApiEndpoints, ApiResponse } from '@/base/Data/ApiService/baseApiService';
import { SubjectEndpoints } from './subject.api.endpoints';
import type Params from '@/base/Core/Params/params';

export default class SubjectApiService extends BaseApiService {
  private static instance: SubjectApiService;

  private readonly subjectEndpoints = new SubjectEndpoints();

  /**
   * Singleton instance
   */
  static getInstance(): SubjectApiService {
    if (!SubjectApiService.instance) {
      SubjectApiService.instance = new SubjectApiService();
    }
    return SubjectApiService.instance;
  }

  protected get endpoints(): Partial<ApiEndpoints> {
    return {
      index: this.subjectEndpoints.index,
      show: this.subjectEndpoints.show,
      create: this.subjectEndpoints.store,
      update: this.subjectEndpoints.update,
      delete: this.subjectEndpoints.delete,
    };
  }

  deleteBranch(params: Params): Promise<ApiResponse> {
    return this.customPost(this.subjectEndpoints.deleteBranch, params);
  }

  indexSubjects(params: Params): Promise<ApiResponse> {
    return this.customPost(this.subjectEndpoints.indexSubjects, params);
  }
}
