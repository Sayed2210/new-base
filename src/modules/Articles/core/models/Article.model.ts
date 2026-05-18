import { QuestionGeneratedByEnum } from '../constant/generatedby.enum';
 
export default class ArticleModel {
  public readonly id?: number;
  public readonly article_title: string;
  public readonly subject: string;
  public readonly generated_by: QuestionGeneratedByEnum;
  public readonly no_of_qs: number;

  constructor(data: {
    id?: number;
    article_title?: string;
    subject?: string;
    generated_by?: QuestionGeneratedByEnum;
    no_of_qs?: number;
  }) {
    this.id = data.id;
    this.article_title = data.article_title || '';
    this.subject = data.subject || '';
    this.generated_by = data.generated_by || QuestionGeneratedByEnum.manual;
    this.no_of_qs = data.no_of_qs || 0;

    Object.freeze(this);
  }

  static fromJson(json: any): ArticleModel {
    if (!json) {
      throw new Error('Cannot create ArticleModel from null or undefined');
    }
 
    return new ArticleModel({
      id: json.id,
      article_title: json.article_title,
      subject: json.subject,
      generated_by: json.generated_by,
      no_of_qs: json.no_of_qs,
    });
  }

  static example: ArticleModel = new ArticleModel({
    id: 1,
    article_title: 'What is the capital of Egypt? ',
    subject: 'Math',
    generated_by: QuestionGeneratedByEnum.manual,
    no_of_qs: 10,
  });
}
