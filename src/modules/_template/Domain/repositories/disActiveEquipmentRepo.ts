// import LangModel from '@/features/setting/languages/Data/models/langModel.ts'
import RepoInterface, { ResponseType } from '@/base/Domain/Repositories/repo_interface'
import type ServicesInterface from '@/base/Data/ApiService/api_service_interface'
import EquipmentModel from '../../Data/models/equipmentModel'
import { DisEquipmentApiService } from '../../Data/apiServices/disEquipmentApiService'

class DisActiveEquipmentRepo extends RepoInterface<EquipmentModel> {
  private static instance: DisActiveEquipmentRepo
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {
    super()
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new DisActiveEquipmentRepo()
    }
    return this.instance
  }

  override get responseType(): ResponseType {
    return ResponseType.withoutData
  }

  onParse(data: any): EquipmentModel {
    return EquipmentModel.fromMap(data)
  }

  get serviceInstance(): ServicesInterface {
    return DisEquipmentApiService.getInstance()
  }
}

export { DisActiveEquipmentRepo }
