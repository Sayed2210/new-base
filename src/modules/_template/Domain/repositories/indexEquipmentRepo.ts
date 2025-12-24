// import LangModel from "@/features/setting/languages/Data/models/langModel.ts";
import RepoInterface from '@/base/Domain/Repositories/repo_interface'
import type ServicesInterface from '@/base/Data/ApiService/api_service_interface'
import EquipmentModel from '../../Data/models/equipmentModel'
import { IndexEquipmentApiService } from '../../Data/apiServices/indexEquipmentApiService'

class IndexEquipmentRepo extends RepoInterface<EquipmentModel[]> {
  private static instance: IndexEquipmentRepo

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {
    super()
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new IndexEquipmentRepo()
    }
    return this.instance
  }

  override get hasPagination(): boolean {
    return true
  }

  onParse(data: any): EquipmentModel[] {
    return data.map((item: any) => EquipmentModel.fromMap(item))
  }

  get serviceInstance(): ServicesInterface {
    return IndexEquipmentApiService.getInstance()
  }
}

export { IndexEquipmentRepo }
