import type Params from '@/base/core/params/params'
// import type LangModel from '@/features/setting/languages/Data/models/langModel'
import type UseCase from '@/base/Domain/UseCase/use_case'
import type { DataState } from '@/base/core/networkStructure/Resources/dataState/data_state'
import type EquipmentModel from '../../Data/models/equipmentModel'
import { DisActiveEquipmentRepo } from '../repositories/disActiveEquipmentRepo'

export default class DisEquipmentUseCase implements UseCase<EquipmentModel, Params> {
  async call(params: Params): Promise<DataState<EquipmentModel>> {
    return DisActiveEquipmentRepo.getInstance().call(params)
  }
}
