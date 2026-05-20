import { QuestionGeneratedByEnum } from '../constant/generatedby.enum';
import ArticleSubjectModel from './Subject.model';

export default class ArticleModel {
  public readonly id?: number;
  public readonly articleTitle: string;
  public readonly subject: { curriculum: string; cycle: string; grade: string } | null;
  public readonly generatedBy: QuestionGeneratedByEnum;
  public readonly noOfQs: number;

  constructor(data: {
    id?: number;
    articleTitle?: string;
    subject?: ArticleSubjectModel;
    generatedBy?: QuestionGeneratedByEnum;
    noOfQs?: number;
  }) {
    this.id = data.id;
    this.articleTitle = data.articleTitle || '';
    this.subject = data.subject || new ArticleSubjectModel({});
    this.generatedBy = data.generatedBy || QuestionGeneratedByEnum.manual;
    this.noOfQs = data.noOfQs || 0;

    Object.freeze(this);
  }

  static fromJson(json: any): ArticleModel {
    if (!json) throw new Error('Cannot create ArticleModel from null or undefined');

    return new ArticleModel({
      id: json.id,
      articleTitle: json.article_title,
      subject: json.subject
        ? {
            curriculum: json.subject.curriculum ?? '',
            cycle: json.subject.cycle ?? '',
            grade: json.subject.grade ?? '',
          }
        : null,
      generatedBy: json.generated_by,
      noOfQs: json.no_of_qs,
    });
  }

  static example: ArticleModel = new ArticleModel({
    id: 1,
    articleTitle: 'What is the capital of Egypt?',
    subject: ArticleSubjectModel.example,
    generatedBy: QuestionGeneratedByEnum.manual,
    noOfQs: 10,
  });
}
