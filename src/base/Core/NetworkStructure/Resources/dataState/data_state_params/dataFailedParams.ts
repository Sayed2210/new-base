import type { ErrorModel } from "~/base/core/networkStructure/Resources/errors/errorModel";

export default interface DataFailedParams<T> {
  error?: ErrorModel | null;
}
