import type Params from "@/base/core/Params/params";
import type { CrudType } from "@/base/Data/ApiService/api_service_interface";



export default interface ServiceCallParams {
  url: string;
  type: CrudType;
  auth?: boolean;
  forceRefresh?: boolean;
  showLoadingDialog?: boolean;
  headers?: Record<string, string>;
  params?: Params;
  details?: Record<string, any>;
}
