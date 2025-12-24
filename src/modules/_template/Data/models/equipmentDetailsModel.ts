// import type TitleModel from "@/base/core/Models/title_model";
import TranslationsParams, { type TitleLocale } from '@/base/core/params/translations_params.ts'
// import TitleInterface from '@/base/Data/Models/title_interface.ts'
import TitleModel from '@/base/Data/Models/title_model.ts'
import type EquipmentTypeModel from './equipmentModel'
import TitleInterface from '@/base/Data/Models/title_interface'
// import { LangEnum } from '../../Core/enums/langEnum'

export default class EquipmentDetailsModel {
  public id: number
  public titles: TitleLocale[]
  public hasCertificate: number
  public allIndustries: number
  public parentId: number
  public image: string
  public industries: TitleModel<string>[]
  public equipmentTypeId: EquipmentTypeModel

  // public descriptions: DescriptionLocale[]

  constructor(
    id: number,
    titles: TitleLocale[],
    hasCertificate: number,
    allIndustries: number,
    industries: TitleModel<string>[] = [],
    parentId: number,
    image: string,
    equipmentTypeId: EquipmentTypeModel,
  ) {
    this.id = id
    this.titles = titles
    this.hasCertificate = hasCertificate
    this.allIndustries = allIndustries
    this.industries = industries
    this.parentId = parentId
    this.image = image
    this.equipmentTypeId = equipmentTypeId
  }

  static fromMap(data: any): EquipmentDetailsModel {
    return new EquipmentDetailsModel(
      data.id,
      TranslationsParams.fromMap(data.titles).titles,
      data.has_certificate,
      data.all_industries,
      data.industries.length > 0
        ? data.industries.map((industry) => this.getTitle(industry))
        : [],
      data.parent_id,
      data.image,
      this.getTitle(data.equipment_type_id),
    )
  }

  static getTitle(data: any) {
    const savedLocale = localStorage.getItem('lang')

    return new TitleInterface({
      id: data.id,
      title: data.titles?.find((title: any) => title.locale === savedLocale)?.title,
    })
  }
}
