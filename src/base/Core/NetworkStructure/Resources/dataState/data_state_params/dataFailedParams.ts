import type { ErrorModel } from "@/base/Core/NetworkStructure/Resources/errors/errorModel";

export default interface DataFailedParams<T> {
  error?: ErrorModel | null;
}
