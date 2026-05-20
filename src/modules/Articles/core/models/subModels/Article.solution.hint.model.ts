export default class ArticleSolutionHintModel {
  public readonly id?: number;
  public readonly hint: string;
  public readonly image: string;

  constructor(data: { id?: number; hint?: string; image?: string }) {
    this.id = data.id;
    this.hint = data.hint || '';
    this.image = data.image || '';
    Object.freeze(this);
  }

  static fromJson(json: any): ArticleSolutionHintModel {
    if (!json) {
      throw new Error('Cannot create ArticleSolutionHintModel from null or undefined');
    }

    return new ArticleSolutionHintModel({
      id: json.id,
      hint: json.hint,
      image: json.image,
    });
  }

  static example: ArticleSolutionHintModel = new ArticleSolutionHintModel({
    id: 1,
    hint: 'Cairo',
    image: 'https://example.com/cairo.jpg',
  });
}
