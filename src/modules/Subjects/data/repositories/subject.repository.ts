import BaseRepository, { type RepositoryConfig } from '@/base/Domain/Repositories/baseRepository';
import SubjectApiService from '../api/subject.api-service';
import StageModel from '@/modules/Stages/core/models/stage.model';

/**
 * Country Repository for API data operations
 *
 * This repository handles all data access for countries,
 * including parsing API responses and error handling.
 */
export default class SubjectRepository extends BaseRepository<StageModel, StageModel[]> {
  private static instance: SubjectRepository;

  protected get apiService() {
    return SubjectApiService.getInstance();
  }

  protected get config(): RepositoryConfig {
    return {
      hasPagination: true,
      dataKey: 'data',
      paginationKey: 'meta',
    };
  }

  protected get mockItem(): StageModel {
    return StageModel.example;
  }

  protected get mockList(): StageModel[] {
    return [StageModel.example];
  }

  /**
   * Get singleton instance
   * @returns CountryRepository instance
   */
  static getInstance(): SubjectRepository {
    if (!SubjectRepository.instance) {
      SubjectRepository.instance = new SubjectRepository();
    }
    return SubjectRepository.instance;
  }

  protected parseItem(data: any): StageModel {
    return StageModel.fromJson(data);
  }

  protected parseList(data: any): StageModel[] {
    if (!Array.isArray(data)) return [];
    return data.reduce((acc: StageModel[], item) => {
      try {
        if (item != null) {
          acc.push(this.parseItem(item));
        }
      } catch {}
      return acc;
    }, []);
  }
}
