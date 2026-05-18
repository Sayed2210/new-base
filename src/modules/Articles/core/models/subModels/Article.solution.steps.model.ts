export default class ArticleSolutionStepsModel {
  public readonly id?: number;
  public readonly step: string;
  public readonly image: string;

  constructor(data: { id?: number; step?: string; image?: string }) {
    this.id = data.id;
    this.step = data.step || '';
    this.image = data.image || '';
    Object.freeze(this);
  }

  static fromJson(json: any): ArticleSolutionStepsModel {
    if (!json) {
      throw new Error('Cannot create ArticleSolutionStepsModel from null or undefined');
    }

    return new ArticleSolutionStepsModel({
      id: json.id,
      step: json.step,
      image: json.image,
    });
  }

  static example: ArticleSolutionStepsModel = new ArticleSolutionStepsModel({
    id: 1,
    step: 'Cairo',
    image: 'https://example.com/cairo.jpg',
  });
}
