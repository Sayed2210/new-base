export default interface GetParams {
  url: string;
  headers?: object;
  queryParams?: Record<string, any>;
  isAuth?: boolean;
}
