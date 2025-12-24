import TitleInterface from '@/base/Data/Models/title_interface'
import TitleModel from '@/base/Data/Models/title_model.ts'
import type EquipmentTypeModel from '@/features/setting/EquipmentType/Data/models/equipmentTypeModel'
// import ClientCategoryModel from "@/features/dashboard/settings/clientCategory/Data/models/index_client_category_model";

export default class EquipmentModel extends TitleInterface {
  public id: number
  public hasCertificate: number
  public allIndustries: number
  public industries: TitleModel<string>[]
  public parentId: number
  public image: string
  public titles: string
  public equipmentType: {}

  constructor(
    id: number,
    title: string,
    subtitle: string,
    hasCertificate: number,
    allIndustries: number,
    industries: TitleModel<string>[] = [],
    parentId: number,
    image: string,
    titles: string,
    equipmentType: {},
  ) {
    super({ id, title, subtitle })

    this.id = id
    this.hasCertificate = hasCertificate
    this.allIndustries = allIndustries
    this.industries = industries
    this.parentId = parentId
    this.image = image
    this.titles = titles
    this.equipmentType = equipmentType
  }

  static fromMap(data: any): EquipmentModel {
    return new EquipmentModel(
      data.id,
      data.title,
      data.subtitle,
      data.has_certificate,
      data.all_industries,
      data.industries.length > 0
        ? data.industries.map((industry) => TitleModel.fromMap(industry))
        : [],
      data.parent_id,
      data.image,
      data.titles,
      data.equipment_type,
    )
  }
}
