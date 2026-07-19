import IndexParams from '@/base/Core/Params/indexParams';
import type { PlacementTestEnum } from '../constant/palcement.test.enum';

export default class IndexPlacementTestParams extends IndexParams {
  public status?: PlacementTestEnum;
  public isPlan?: boolean;
  public date?: string;

  constructor(data: {
    word: string;
    pageNumber: number;
    perPage: number;
    withPage: number;
    status?: PlacementTestEnum;
    isPlan?: boolean;
    date?: string;
  }) {
    super(data.word, data.pageNumber, data.perPage, data.withPage);
    this.status = data.status;
    this.isPlan = data.isPlan;
    this.date = data.date;
  }

  toMap(): Record<string, string | number | any  | number[] | null > {
    const map = super.toMap();
    if (this.status != null) {
      map['status'] = this.status;
      if (this.isPlan) {
        map['is_plan'] = this.isPlan;
      }
      map['date'] = this.date ? this.date : undefined;
    }
    return map;
  }
}
