// import LangModel from '@/features/setting/languages/Data/models/langModel.ts'
import RepoInterface from '@/base/Domain/Repositories/repo_interface'
import type ServicesInterface from '@/base/Data/ApiService/api_service_interface'
import EquipmentModel from '../../Data/models/equipmentModel'
import { EditEquipmentApiService } from '../../Data/apiServices/editEquipmentApiService'

class EditEquipmentRepo extends RepoInterface<EquipmentModel> {
  private static instance: EditEquipmentRepo

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {
    super()
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new EditEquipmentRepo()
    }
    return this.instance
  }

  onParse(data: any): EquipmentModel {
    return EquipmentModel.fromMap(data)
  }

  get serviceInstance(): ServicesInterface {
    return EditEquipmentApiService.getInstance()
  }
}

export { EditEquipmentRepo }
