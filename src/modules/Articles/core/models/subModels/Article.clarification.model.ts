import type TitleInterface from '@/base/Data/Models/titleInterface';

export default class ArticleClarificationModel {
  public readonly documents?: TitleInterface<number>;
  public readonly source?: string;
  public readonly clarification?: string;
  public readonly file?: string;
 
  constructor(data: {
    documents?: TitleInterface<number>;
    source?: string;
    clarification?: string;
    file?: string;
  }) {
    this.documents = data.documents;
    this.source = data.source || '';
    this.clarification = data.clarification || '';
    this.file = data.file || '';
    Object.freeze(this);
  }

  static fromJson(json: any): ArticleClarificationModel {
    if (!json) {
      throw new Error('Cannot create ArticleClarificationModel from null or undefined');
    }

    return new ArticleClarificationModel({
      documents: json.documents,
      source: json.source,
      clarification: json.clarification,
      file: json.file,
    });
  }

  static example: ArticleClarificationModel = new ArticleClarificationModel({
    documents: {
      id: 1,
      title: 'Source',
    },
    source: 'Source',
    clarification: 'Clarification',
    file: 'File',
  });
}
