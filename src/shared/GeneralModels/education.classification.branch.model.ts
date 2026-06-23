export default class EducationClassificationBranchModel {
  public readonly id?: number;
  public readonly title?: string;
  public readonly childs?: EducationClassificationBranchModel[];

  constructor(data: { id?: number; title?: string; childs?: EducationClassificationBranchModel[] }) {
    this.id = data.id;
    this.title = data.title;
    this.childs = data.childs;
    Object.freeze(this);
  }

  static fromJson(json: any): EducationClassificationBranchModel {
    if (!json) {
      throw new Error('Cannot create EducationClassificationBranchModel from null or undefined');
    }

    return new EducationClassificationBranchModel({
      id: json.id,
      title: json.title,
      childs: json.childs?.map((child: any) => EducationClassificationBranchModel.fromJson(child)),
    });
  }

  static example: EducationClassificationBranchModel = new EducationClassificationBranchModel({
    id: 1,
    title: 'Mathematics',
    childs: [],
  });
}
