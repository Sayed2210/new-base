import type { DataState } from '@/base/Core/NetworkStructure/Resources/dataState/dataState';
import type Params from '@/base/Core/Params/params';
import type ArticleModel from '../../core/models/Article.model';

/**
 * Interface for Employee Repository
 */
export default interface IArticleRepo {
  index(params?: Params): Promise<DataState<ArticleModel[]>>;
  show(params: Params): Promise<DataState<ArticleModel>>;
  create(params: Params): Promise<DataState<ArticleModel>>;
  update(params: Params): Promise<DataState<ArticleModel>>;
  delete(params: Params): Promise<DataState<void>>;
}
