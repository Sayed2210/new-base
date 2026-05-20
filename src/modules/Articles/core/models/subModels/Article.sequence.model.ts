export default class ArticleSequenceTreeModel {
  public readonly id?: number;
  public readonly title: string;
  public readonly children?: ArticleSequenceTreeModel[];

  constructor(data: { id?: number; title?: string; children?: ArticleSequenceTreeModel[] }) {
    this.id = data.id;
    this.title = data.title || '';
    this.children = data.children || [];
    Object.freeze(this);
  }

  static fromJson(json: any): ArticleSequenceTreeModel {
    if (!json) {
      throw new Error('Cannot create ArticleSequenceTreeModel from null or undefined');
    }

    return new ArticleSequenceTreeModel({
      id: json.id,
      title: json.title,
      children: json.children,
    });
  }

  static example: ArticleSequenceTreeModel = new ArticleSequenceTreeModel({
    id: 1,
    title: 'Cairo',
    children: [],
  });
}
