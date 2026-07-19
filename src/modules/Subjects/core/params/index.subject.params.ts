import IndexParams from '@/base/Core/Params/indexParams';

export default class IndexSubjectParams extends IndexParams {
  public parentId?: number;
  constructor(
    word: string = '',
    pageNumber: number = 1,
    perPage: number = 10,
    withPage: number = 1,
    parentId: number = 0,
  ) {
    super(word, pageNumber, perPage, withPage);
    this.parentId = parentId;
  }

  toMap(): Record<string, string | number | number[] | null> {
    const data = super.toMap();
    if (this.parentId) data.education_classification_branch_id = this.parentId;
    return data;
  }
}
