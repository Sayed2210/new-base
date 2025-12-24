// import ClientModel from '@/features/setting/languages/Data/models/equipmentTypeModel.ts'
import RepoInterface, { ResponseType } from '@/base/Domain/Repositories/repo_interface'
import type ServicesInterface from '@/base/Data/ApiService/api_service_interface'
// import LangModel from '@/features/setting/languages/Data/models/langModel.ts'
import EquipmentModel from '../../Data/models/equipmentModel'
import { DeleteEquipmentApiService } from '../../Data/apiServices/deleteEquipmentApiService'

class DeleteEquipmentRepo extends RepoInterface<EquipmentModel> {
  private static instance: DeleteEquipmentRepo

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {
    super()
  }

  override get responseType(): ResponseType {
    return ResponseType.withoutData
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new DeleteEquipmentRepo()
    }
    return this.instance
  }

  onParse(data: any): EquipmentModel {
    return EquipmentModel.fromMap(data)
  }

  get serviceInstance(): ServicesInterface {
    return DeleteEquipmentApiService.getInstance()
  }
}

export { DeleteEquipmentRepo }
