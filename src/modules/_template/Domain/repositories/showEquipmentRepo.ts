import RepoInterface from '@/base/Domain/Repositories/repo_interface'
import type ServicesInterface from '@/base/Data/ApiService/api_service_interface'
// import ShowLangModel from '@/features/setting/languages/Data/models/langDetailsModel'
import EquipmentDetailsModel from '../../Data/models/equipmentDetailsModel'
import { ShowEquipmentApiService } from '../../Data/apiServices/showEquipmentApiService'

class ShowEquipmentRepo extends RepoInterface<EquipmentDetailsModel> {
  private static instance: ShowEquipmentRepo

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {
    super()
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ShowEquipmentRepo()
    }
    return this.instance
  }

  onParse(data: any): EquipmentDetailsModel {
    return EquipmentDetailsModel.fromMap(data)
  }

  get serviceInstance(): ServicesInterface {
    return ShowEquipmentApiService.getInstance()
  }
}

export { ShowEquipmentRepo }
