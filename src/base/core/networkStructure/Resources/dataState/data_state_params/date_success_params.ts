import type PaginationModel from "~/base/core/Models/pagination_model";

export default interface DataSuccessParams<T> {
  data?: T | null;
  searchData?: T | null;
  pagination?: PaginationModel | null;
  message?: string | null;
}
