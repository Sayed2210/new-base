export default class ArticleDocumentModel {
  public readonly id?: number;
  public readonly title: string;
  public readonly source: string;

  constructor(data: { id?: number; title?: string; source?: string }) {
    this.id = data.id;
    this.title = data.title || '';
    this.source = data.source || '';
    Object.freeze(this);
  }

  static fromJson(json: any): ArticleDocumentModel {
    if (!json) {
      throw new Error('Cannot create ArticleDocumentModel from null or undefined');
    }

    return new ArticleDocumentModel({
      id: json.id,
      title: json.title,
      source: json.source,
    });
  }

  static example: ArticleDocumentModel = new ArticleDocumentModel({
    id: 1,
    title: 'Cairo',
    source: 'Cairo',
  });
}
