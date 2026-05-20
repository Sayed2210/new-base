import BaseRepository, { type RepositoryConfig } from '@/base/Domain/Repositories/baseRepository';
import ArticleModel from '../../core/models/Article.model';
import ArticleSubjectModel from '../../core/models/Subject.model';
import ArticleApiService from '../api/Artical.api-service';
import { QuestionGeneratedByEnum } from '../../core/constant/generatedby.enum';

export default class ArticleRepository extends BaseRepository<ArticleModel, ArticleModel[]> {
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

  protected get mockItem(): ArticleModel {
    return ArticleModel.example;
  }

  protected get mockList(): ArticleModel[] {
    return [
      ArticleModel.example,
      new ArticleModel({
        id: 2,
        articleTitle: 'What are the benefits of renewable energy?',
        subject: ArticleSubjectModel.example2,
        generatedBy: QuestionGeneratedByEnum.manual,
        noOfQs: 5,
      }),
      new ArticleModel({
        id: 3,
        articleTitle: 'How does solar power work?',
        subject: ArticleSubjectModel.example3,
        generatedBy: QuestionGeneratedByEnum.ai,
        noOfQs: 8,
      }),
      new ArticleModel({
        id: 4,
        articleTitle: 'What are the challenges of wind energy?',
        subject: ArticleSubjectModel.example,
        generatedBy: QuestionGeneratedByEnum.manual,
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

  protected parseItem(data: any): ArticleModel {
    return ArticleModel.fromJson(data);
  }

  protected parseList(data: any): ArticleModel[] {
    if (!Array.isArray(data)) return [];
    return data.reduce((acc: ArticleModel[], item) => {
      try {
        if (item != null) {
          acc.push(this.parseItem(item));
        }
      } catch {}
      return acc;
    }, []);
  }
}
