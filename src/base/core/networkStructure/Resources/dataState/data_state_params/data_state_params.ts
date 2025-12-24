import { ErrorModel } from "../../errors/errorModel";
import { ValidationModel } from "../../validations/validation_model";
import PaginationModel from "@/base/core/Models/pagination_model";
interface Data_state_params<T> {
  data?: T | null;
  searchData?: T | null;
  error?: ErrorModel | null;
  pagination?: PaginationModel | null;
  message?: string | null;
  validation?: ValidationModel | null;
}

interface DataSuccessParams<T> {
  data?: T | null;
  searchData?: T | null;
  pagination?: PaginationModel | null;
  message?: string | null;
}

interface DataFailedParams<T> {
  error?: ErrorModel | null;
}

interface DataInitialParams<T> {
  data?: T | null;
}

export type {
  Data_state_params,
  DataSuccessParams,
  DataFailedParams,
  DataInitialParams,
};
