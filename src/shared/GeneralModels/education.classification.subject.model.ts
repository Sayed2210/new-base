export default class EducationClassificationSubjectModel {
  public readonly id?: number;
  public readonly title?: string;
  public readonly childs?: EducationClassificationSubjectModel[];

  constructor(data: { id?: number; title?: string; childs?: EducationClassificationSubjectModel[] }) {
    this.id = data.id;
    this.title = data.title;
    this.childs = data.childs;
    Object.freeze(this);
  }

  static fromJson(json: any): EducationClassificationSubjectModel {
    if (!json) {
      throw new Error('Cannot create EducationClassificationSubjectModel from null or undefined');
    }

    return new EducationClassificationSubjectModel({
      id: json.id,
      title: json.title,
      childs: json.childs?.map((child: any) => EducationClassificationSubjectModel.fromJson(child)),
    });
  }

  static example: EducationClassificationSubjectModel = new EducationClassificationSubjectModel({
    id: 1,
    title: 'Mathematics',
    childs: [],
  });
}
