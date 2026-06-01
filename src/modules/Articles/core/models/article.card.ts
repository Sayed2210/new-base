import ArticleAnswerModel from './subModels/Article.answer.model';
import { ArticleDifficultyEnum } from '../constant/Article.difficulty.enum';
import { ArticleTypeEnum } from '../constant/Article.type.enum';
export default class ArticleCardModel {
  public readonly id: number;
  public readonly title: string;
  public readonly createdAt: string;
  public readonly questions: string;
  public readonly answer?: ArticleAnswerModel[];
  public readonly articledifficulty?: ArticleDifficultyEnum; 
  public readonly status?: ArticleTypeEnum;

  constructor(data: {
    id: number;
    title: string;
    createdAt: string;
    questions: string;
    answer?: ArticleAnswerModel[];
    articledifficulty?: ArticleDifficultyEnum; 
    status?: ArticleTypeEnum;
  }) {
    this.id = data.id || 0;
    this.title = data.title || '';
    this.createdAt = data.createdAt || '';
    this.questions = data.questions || '';
    this.answer = data.answer || undefined;
    this.articledifficulty = data.articledifficulty || ArticleDifficultyEnum.easy;
    this.status = data.status || ArticleTypeEnum.mcq;
  }

  static fromJson(json: any): ArticleCardModel {
    if (!json) {
      throw new Error('Cannot create ArticleCardModel from null or undefined');
    }
    return new ArticleCardModel({
      id: json.id ?? json.id ?? 0,
      title: json.title ?? json.title ?? '',
      createdAt: json.createdAt ?? json.createdAt ?? '',
      questions: json.questions ?? json.questions ?? '',
      answer: json.answer ?? json.answer ?? undefined,
      articledifficulty: json.articledifficulty ?? json.articledifficulty ?? ArticleDifficultyEnum.easy,
      status: json.status ?? json.status ?? ArticleTypeEnum.mcq,
    });
  }

  static example = [
    new ArticleCardModel({
      id: 1,
      title: 'Exam frequency',
      createdAt: '2022-01-01',
      questions: 'Which of the following best describes the primary mechanism through which rising ocean ?',
      answer: ArticleAnswerModel.examples,
      articledifficulty: ArticleDifficultyEnum.easy,
      status: ArticleTypeEnum.mcq,
    }),
      new ArticleCardModel({
      id: 1,
      title: 'Exam frequency',
      createdAt: '2022-01-01',
      questions: 'Which of the following best describes the primary mechanism through which rising ocean ?',
      answer: ArticleAnswerModel.examples,
      articledifficulty: ArticleDifficultyEnum.hard,
      status: ArticleTypeEnum.true_false,
    }),
      new ArticleCardModel({
      id: 1,
      title: 'Exam frequency',
      createdAt: '2022-01-01',
      questions: 'Which of the following best describes the primary mechanism through which rising ocean ?',
      answer: ArticleAnswerModel.examples,
      articledifficulty: ArticleDifficultyEnum.medium,
      status: ArticleTypeEnum.matching,
    }),
    // new ArticleCardModel({
    //   id: 2,
    //   title: 'Exam frequency',
    //   createdAt: '2022-01-01',
    //   questions: 'Which of the following best describes the primary mechanism through which rising ocean ?',
    //   answer: ArticleAnswerModel.example,
    //   articledifficulty: ArticleDifficultyEnum.hard,
    //   status: ArticleTypeEnum.ranking,
    // }),
    // new ArticleCardModel({
    //   id: 3,
    //   title: 'Exam frequency',
    //   createdAt: '2022-01-01',
    //   questions: 'Which of the following best describes the primary mechanism through which rising ocean ?',
    //   answer: ArticleAnswerModel.example,   
    //   articledifficulty: ArticleDifficultyEnum.medium,
    //   status: ArticleTypeEnum.true_false,
    // }),
  ];

}