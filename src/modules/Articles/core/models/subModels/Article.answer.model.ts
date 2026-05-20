export default class ArticleAnswerModel {
  public readonly id?: number;
  public readonly answer: string;
  public readonly image: string;

  constructor(data: { id?: number; answer?: string; image?: string }) {
    this.id = data.id;
    this.answer = data.answer || '';
    this.image = data.image || '';
    Object.freeze(this);
  }

  static fromJson(json: any): ArticleAnswerModel {
    if (!json) {
      throw new Error('Cannot create ArticleAnswerModel from null or undefined');
    }

    return new ArticleAnswerModel({
      id: json.id,
      answer: json.answer,
      image: json.image,
    });
  }

  static example: ArticleAnswerModel = new ArticleAnswerModel({
    id: 1,
    answer: 'Cairo',
    image: 'https://example.com/cairo.jpg',
  });
}
