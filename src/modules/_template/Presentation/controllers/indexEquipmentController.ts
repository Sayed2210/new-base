// import { ControllerInterface } from '@/base/Presentation/Controller/controller_interface'
import type { DataState } from '@/base/core/networkStructure/Resources/dataState/data_state'
import type Params from '@/base/core/params/params'
import { SelectControllerInterface } from '@/base/Presentation/Controller/select_controller_interface'
import type EquipmentModel from '../../Data/models/equipmentModel'
import IndexEquipmentUseCase from '../../Domain/useCase/indexEquipmentUseCase'
import TitleInterface from '@/base/Data/Models/title_interface'
// import TitleInterface from '@/base/Data/Models/title_interface'

export default class IndexEquipmentController extends SelectControllerInterface<EquipmentModel[]> {
  private static instance: IndexEquipmentController
  private constructor() {
    super()
  }
  private indexEquipmentUseCase = new IndexEquipmentUseCase()

  static getInstance() {
    if (!this.instance) {
      this.instance = new IndexEquipmentController()
    }
    return this.instance
  }

  async getData(params: Params) {
    // useLoaderStore().setLoadingWithDialog();
    // console.log(params)
    this.setLoading()
    const dataState: DataState<EquipmentModel[]> = await this.indexEquipmentUseCase.call(params)

    this.setState(dataState)
    if (this.isDataSuccess()) {
      // useLoaderStore().endLoadingWithDialog();
    } else {
      throw new Error('Error while addServices')
    }
    super.handleResponseDialogs()
    return this.state
  }

  async fetch(params: Params) {
    const data = await this.getData(params)
    const adaptData: any[] = []
    if (this.isDataSuccess()) {
      ;(data.value.data ?? []).map((el: any) => {
        adaptData.push(
          new TitleInterface({
            id: el?.id,
            title: el?.equipmentType?.title
              ? `${el?.equipmentType?.title ?? ''} - ${el?.title ?? ''} `
              : el?.title || '',
            subtitle: el?.subtitle || '',
          }),
        )
      })
    }

    return adaptData
  }
}
