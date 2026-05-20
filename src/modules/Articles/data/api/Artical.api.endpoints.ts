import { BaseEndpoints } from '@/base/Data/Endpoints/BaseEndpoints';

export class ArticleEndpoints extends BaseEndpoints {
  protected readonly prefix = 'dashboard/';

  readonly index = this.url('fetch_articles');
  readonly show = this.url('show_article');
  readonly store = this.url('store_article');
  readonly update = this.url('update_article');
  readonly delete = this.url('delete_article');
}
