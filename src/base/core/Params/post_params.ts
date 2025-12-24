export default interface PostParams {
  url: string;
  data: object;
  headers?: object;
  queryParams?: Record<string, any>;
  isAuth?: boolean;
}
