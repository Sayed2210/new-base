export default class ArticleAnswerModel {
  public readonly id?: number;
  public readonly answer: string;
  public readonly image: string;
  public readonly countCorrect: number;
  public readonly countStudent: number;


  constructor(data: { id?: number; answer?: string; image?: string, countCorrect: number, countStudent: number }) {
    this.id = data.id;
    this.answer = data.answer || '';
    this.image = data.image || '';
    this.countCorrect = data.countCorrect ;
    this.countStudent = data.countStudent ;
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
      countCorrect: json.countCorrect,
      countStudent: json.countStudent,
    });
  }

  static example: ArticleAnswerModel = new ArticleAnswerModel({
    id: 1,
    answer: 'Cairo',
    image: 'https://example.com/cairo.jpg',
    countCorrect: 10,
    countStudent: 20,
  });
}
