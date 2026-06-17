import IndexParams from '@/base/Core/Params/indexParams';

export default class IndexEducationClassificationParams extends IndexParams {
  public date: string;
  constructor(
    data: {
      word?: string;
      pageNumber?: number;
      perPage?: number;
      withPage?: number;
      date?: string;
    } = {
      word: '',
      pageNumber: 1,
      perPage: 10,
      withPage: 1,
      date: '',
    },
  ) {
    super(data.word ?? '', data.pageNumber ?? 1, data.perPage ?? 10, data.withPage ?? 1);
    this.date = data.date ?? '';
  }

  toMap(): Record<string, string | number | number[] | null> {
    const data = super.toMap();
    if (this.date) {
      data['date'] = this.date;
    }
    return data;
  }
}
