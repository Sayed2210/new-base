import type { DataState } from "@/base/core/networkStructure/Resources/dataState/data_state";

export default interface UseCase<T, P> {
  call(params: P): Promise<DataState<T>>;
}
