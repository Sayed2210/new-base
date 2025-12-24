// import LangModel from '@/features/setting/EquipmentType/Data/models/langModel.ts'
import RepoInterface from '@/base/Domain/Repositories/repo_interface'
import type ServicesInterface from '@/base/Data/ApiService/api_service_interface'
import EquipmentModel from '../../Data/models/equipmentModel'
import { AddEquipmentApiService } from '../../Data/apiServices/addEquipmentApiService'

class AddEquipmentRepo extends RepoInterface<EquipmentModel> {
  private static instance: AddEquipmentRepo
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {
    super()
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new AddEquipmentRepo()
    }
    return this.instance
  }

  onParse(data: any): EquipmentModel {
    return EquipmentModel.fromMap(data)
  }

  get serviceInstance(): ServicesInterface {
    return AddEquipmentApiService.getInstance()
  }
}

export { AddEquipmentRepo }
