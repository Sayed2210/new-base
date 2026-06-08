import type TitleInterface from '@/base/Data/Models/titleInterface';
import { ArticleGeneratedByEnum } from '../constant/Article.generatedby.enum';
import { ArticleStatusEnum } from '../constant/Article.status.enum';
import { ArticleTypeEnum } from '../constant/Article.type.enum';
import ArticleSubjectModel from './Subject.model';

export default class ArticleModel {
  public readonly id?: number;
  public readonly articleTitle: string;
  public readonly subject: ArticleSubjectModel | null;
  public readonly generatedBy: ArticleGeneratedByEnum;
  public readonly noOfQs: number;
  public readonly status: ArticleStatusEnum;
  public readonly articleType?: ArticleTypeEnum;
  public readonly e_c_subject: TitleInterface<number>;

  constructor(data: {
    id?: number;
    articleTitle?: string;
    subject?: ArticleSubjectModel | null;
    generatedBy?: ArticleGeneratedByEnum;
    noOfQs?: number;
    status?: ArticleStatusEnum;
    articleType?: ArticleTypeEnum;
    e_c_subject?: TitleInterface<number>;
  }) {
    this.id = data.id;
    this.articleTitle = data.articleTitle ?? '';
    this.subject = data.subject ?? null;
    this.generatedBy = data.generatedBy ?? ArticleGeneratedByEnum.manual;
    this.noOfQs = data.noOfQs ?? 5555;
    this.status = data.status ?? ArticleStatusEnum.not_Reviewd;
    this.articleType = data.articleType ?? ArticleTypeEnum.mcq;
    this.e_c_subject = data.e_c_subject;

    Object.freeze(this);
  }

  static fromJson(json: any): ArticleModel {
    if (!json) throw new Error('Cannot create ArticleModel from null or undefined');

    return new ArticleModel({
  id: json.question_id,
  articleTitle: json.question, 
  subject: json.e_c_branch
    ? ArticleSubjectModel.fromJson(json.e_c_branch)
    : null,
  generatedBy: json.from_source_type,
  noOfQs: json.number_of_questions,
  status: json.status,
  articleType: json.question_type,
  e_c_subject: json.e_c_subject, 
});
  }

  static example: ArticleModel = new ArticleModel({
    id: 1,
    articleTitle: 'What is the capital of Egypt?',
    subject: ArticleSubjectModel.example,
    generatedBy: ArticleGeneratedByEnum.ai,
    noOfQs: 10,
    status: ArticleStatusEnum.not_Reviewd,
    articleType: ArticleTypeEnum.mcq,
    e_c_subject: {
      title: 'Math',
      id: 1,
    },
  });
}

