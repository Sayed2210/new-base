import { BaseEndpoints } from '@/base/Data/Endpoints/BaseEndpoints';

export class SubjectEndpoints extends BaseEndpoints {
  protected readonly prefix = 'dashboard/';

  readonly index = this.url('fetch_education_classification_subjects');
  readonly show = this.url('show_subject');
  readonly store = this.url('store_subject');
  readonly update = this.url('update_subject');
  readonly delete = this.url('delete_subject');
}
