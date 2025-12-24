import type Params from "~/base/core/Params/params";
enum CrudType {
  POST = "post",
  GET = "get",
}
export interface ServiceCaller {
  call(
    url: string,
    type: CrudType,
    auth: boolean,
    forceRefresh: boolean,
    showLoadingDialog: boolean,
    headers?: Record<string, string>,
    params?: Params,
    details?: Record<string, any>,
  ): Promise<{ data: any; statusCode: number }>;
}
