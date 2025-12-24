import type Params from '@/base/core/params/params'
// import type LangModel from "@/features/setting/languages/Data/models/langModel.ts";
import type UseCase from '@/base/Domain/UseCase/use_case'
import type { DataState } from '@/base/core/networkStructure/Resources/dataState/data_state'
import type EquipmentModel from '../../Data/models/equipmentModel'
import { EditEquipmentRepo } from '../repositories/editEquipmentRepo'

export default class EditEquipmentUseCase implements UseCase<EquipmentModel, Params> {
  async call(params: Params): Promise<DataState<EquipmentModel>> {
    return EditEquipmentRepo.getInstance().call(params)
  }
}
