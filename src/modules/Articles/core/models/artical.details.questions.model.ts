import { ArticleDifficultyEnum } from '../constant/Article.difficulty.enum';
import { ArticleTypeEnum } from '../constant/Article.type.enum';
import ArticleAnswerModel from './subModels/Article.answer.model';


export default class ArticalDetailsQuestionModel {
  public readonly id: number;
  public readonly createdAt: string;
  public readonly ArticleDifficulty: ArticleDifficultyEnum;
  public readonly ArticleType: ArticleTypeEnum;
  public readonly title: string;
  public readonly ArticleAnswer: ArticleAnswerModel[];

  constructor(data: {
    id: number;
    createdAt: string;
    ArticleDifficulty: ArticleDifficultyEnum;
    ArticleType: ArticleTypeEnum;
    title: string;
    ArticleAnswer: ArticleAnswerModel[];
  }) {
    this.id = data.id || 0;
    this.createdAt = data.createdAt || '';
    this.ArticleDifficulty = data.ArticleDifficulty;
    this.ArticleType = data.ArticleType;
    this.title = data.title || '';
    this.ArticleAnswer = data.ArticleAnswer || [];
  }

  static fromJson(json: any): ArticalDetailsQuestionModel {
    if (!json) {
      throw new Error('Cannot create ArticalDetailsQuestionModel from null or undefined');
    }
    return new ArticalDetailsQuestionModel({
      id: json.id ?? json.id ?? 0,
      createdAt: json.createdAt ?? json.createdAt ?? '',
      ArticleDifficulty: json.ArticleDifficulty ?? json.ArticleDifficulty,
      ArticleType: json.ArticleType ?? json.ArticleType,
      title: json.title ?? json.title ?? '',
      ArticleAnswer: json.ArticleAnswer?.map((answer: any) => ArticleAnswerModel.fromJson(answer)) ?? [],
    });
  }

  static example = new ArticalDetailsQuestionModel({
    id: 1,
    createdAt: '2022-01-01',
    ArticleDifficulty: ArticleDifficultyEnum.easy,
    ArticleType: ArticleTypeEnum.mcq,
    title: 'Which of the following best describes the primary mechanism through which rising ocean ?',
    ArticleAnswer: [ArticleAnswerModel.example],
  });

}
