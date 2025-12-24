import type Params from '@/base/core/params/params'
// import type LangModel from "@/features/setting/languages/Data/models/langModel";
import type UseCase from '@/base/Domain/UseCase/use_case'
import type { DataState } from '@/base/core/networkStructure/Resources/dataState/data_state'
import type EquipmentModel from '../../Data/models/equipmentModel'
import { IndexEquipmentRepo } from '../repositories/indexEquipmentRepo'

export default class IndexEquipmentUseCase implements UseCase<EquipmentModel[], Params> {
  async call(params: Params): Promise<DataState<EquipmentModel[]>> {
    return IndexEquipmentRepo.getInstance().call(params)
  }
}
