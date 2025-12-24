import { ControllerInterface } from '@/base/Presentation/Controller/controller_interface'
import type { DataState } from '@/base/core/networkStructure/Resources/dataState/data_state'
import type Params from '@/base/core/params/params'
import ShowEquipmentUseCase from '../../Domain/useCase/showEquipmentUseCase'
import type EquipmentDetailsModel from '../../Data/models/equipmentDetailsModel'

export default class ShowEquipmentController extends ControllerInterface<EquipmentDetailsModel> {
  private static instance: ShowEquipmentController

  private constructor() {
    super()
  }

  private showEquipmentUseCase = new ShowEquipmentUseCase()

  static getInstance() {
    if (!this.instance) {
      this.instance = new ShowEquipmentController()
    }
    return this.instance
  }

  async showEquipmentType(params: Params) {
    // useLoaderStore().setLoadingWithDialog();
    // console.log(params)
    this.setLoading()

    const dataState: DataState<EquipmentDetailsModel> = await this.showEquipmentUseCase.call(params)

    this.setState(dataState)
    if (this.isDataSuccess()) {
      // useLoaderStore().endLoadingWithDialog();
    } else {
      throw new Error('Error while addServices')
    }
    super.handleResponseDialogs()
    return this.state
  }
}
