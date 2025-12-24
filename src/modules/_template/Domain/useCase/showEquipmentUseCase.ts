import type Params from '@/base/core/params/params'
// import type ShowLangModel from "@/features/setting/languages/Data/models/langDetailsModel";
import type UseCase from '@/base/Domain/UseCase/use_case'
import type { DataState } from '@/base/core/networkStructure/Resources/dataState/data_state'
import type EquipmentDetailsModel from '../../Data/models/equipmentDetailsModel'
import { ShowEquipmentRepo } from '../repositories/showEquipmentRepo'

export default class ShowEquipmentUseCase implements UseCase<EquipmentDetailsModel, Params> {
  async call(params: Params): Promise<DataState<EquipmentDetailsModel>> {
    return ShowEquipmentRepo.getInstance().call(params)
  }
}
