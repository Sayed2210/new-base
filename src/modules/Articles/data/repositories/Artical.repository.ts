import BaseRepository, { type RepositoryConfig } from '@/base/Domain/Repositories/baseRepository';
import ArticleModel from '../../core/models/Article.model';
import ArticleSubjectModel from '../../core/models/Subject.model';
import ArticleApiService from '../api/Artical.api-service';
import { ArticleGeneratedByEnum } from '../../core/constant/Article.generatedby.enum';
import ArticalDetailsModel from '../../core/models/artical.details.model';

export default class ArticleRepository extends BaseRepository<ArticalDetailsModel, ArticleModel[]> {
  private static instance: ArticleRepository;

  protected get apiService() {
    return ArticleApiService.getInstance();
  }

  protected get config(): RepositoryConfig {
    return {
      hasPagination: true,
      dataKey: 'data',
      paginationKey: 'meta',
    };
  }

  protected get mockItem(): ArticalDetailsModel {
    return ArticalDetailsModel.example;
  }

  protected get mockList(): ArticleModel[] {
    return [
      ArticleModel.example,
      new ArticleModel({
        id: 2,
        articleTitle: 'What are the benefits of renewable energy?',
        subject: ArticleSubjectModel.example2,
        generatedBy: ArticleGeneratedByEnum.manual,
        noOfQs: 5,
      }),
      new ArticleModel({
        id: 3,
        articleTitle: 'How does solar power work?',
        subject: ArticleSubjectModel.example3,
        generatedBy: ArticleGeneratedByEnum.ai,
        noOfQs: 8,
      }),
      new ArticleModel({
        id: 4,
        articleTitle: 'What are the challenges of wind energy?',
        subject: ArticleSubjectModel.example,
        generatedBy: ArticleGeneratedByEnum.manual,
        noOfQs: 12,
      }),
    ];
  }

  static getInstance(): ArticleRepository {
    if (!ArticleRepository.instance) {
      ArticleRepository.instance = new ArticleRepository();
    }
    return ArticleRepository.instance;
  }

  protected parseItem(data: any): ArticalDetailsModel {
    return ArticalDetailsModel.fromJson(data);
  }

  protected parseList(data: any): ArticleModel[] {
    if (!Array.isArray(data)) return [];
    return data.reduce((acc: ArticleModel[], item) => {
      try {
        if (item != null) {
          acc.push(ArticleModel.fromJson(item));
        }
      } catch {}
      return acc;
    }, []);
  }
}
