import type Params from '@/base/core/params/params'
import type UseCase from '@/base/Domain/UseCase/use_case'
import type { DataState } from '@/base/core/networkStructure/Resources/dataState/data_state'
import type EquipmentModel from '../../Data/models/equipmentModel'
import { DeleteEquipmentRepo } from '../repositories/deleteEquipmentRepo'

export default class DeleteEquipmentUseCase implements UseCase<EquipmentModel, Params> {
  async call(params: Params): Promise<DataState<EquipmentModel>> {
    return DeleteEquipmentRepo.getInstance().call(params)
  }
}
