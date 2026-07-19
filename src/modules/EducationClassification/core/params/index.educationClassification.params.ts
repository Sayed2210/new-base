import IndexParams from '@/base/Core/Params/indexParams';

export default class IndexEducationClassificationParams extends IndexParams {
  public date: string;
  public order: number;
  constructor(
    data: {
      word?: string;
      pageNumber?: number;
      perPage?: number;
      withPage?: number;
      date?: string;
      order?: number;
    } = {
      word: '',
      pageNumber: 1,
      perPage: 10,
      withPage: 1,
      date: '',
      order: 1,
    },
  ) {
    super(data.word ?? '', data.pageNumber ?? 1, data.perPage ?? 10, data.withPage ?? 1);
    this.date = data.date ?? '';
    this.order = data.order ?? 1;
  }

  toMap(): Record<string, string | number | number[] | null> {
    const data = super.toMap();
    data['order_dir'] = this.order;
    if (this.date) {
      data['created_at'] = this.date;
    }
    return data;
  }
}
