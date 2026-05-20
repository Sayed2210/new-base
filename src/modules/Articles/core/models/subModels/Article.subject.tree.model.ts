export default class ArticleSubjectTreeModel {
  public readonly id?: number;
  public readonly title: string;
  public readonly children?: ArticleSubjectTreeModel[];

  constructor(data: { id?: number; title?: string; children?: ArticleSubjectTreeModel[] }) {
    this.id = data.id;
    this.title = data.title || '';
    this.children = data.children || [];
    Object.freeze(this);
  }

  static fromJson(json: any): ArticleSubjectTreeModel {
    if (!json) {
      throw new Error('Cannot create ArticleSubjectTreeModel from null or undefined');
    }

    return new ArticleSubjectTreeModel({
      id: json.id,
      title: json.title,
      children: json.children,
    });
  }

  static example: ArticleSubjectTreeModel = new ArticleSubjectTreeModel({
    id: 1,
    title: 'Cairo',
    children: [],
  });
}
