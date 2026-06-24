export default class EducationClassificationBranchModel {
  public readonly id?: number;
  public readonly title?: string;
  public readonly fullTitle?: string;
  public readonly childs?: EducationClassificationBranchModel[];
  public readonly subjects?: EducationClassificationBranchModel[];

  constructor(data: {
    id?: number;
    title?: string;
    Fulltitle?: string;
    childs?: EducationClassificationBranchModel[];
    subjects?: EducationClassificationBranchModel[];
  }) {
    this.id = data.id;
    this.title = data.title;
    this.childs = data.childs;
    this.subjects = data.subjects;
    this.fullTitle = data.Fulltitle;
    Object.freeze(this);
  }

  static fromJson(json: any): EducationClassificationBranchModel {
    if (!json) {
      throw new Error('Cannot create EducationClassificationBranchModel from null or undefined');
    }

    return new EducationClassificationBranchModel({
      id: json.id,
      title: json.title,
      childs: json.children?.map((child: any) =>
        EducationClassificationBranchModel.fromJson(child),
      ),
      subjects: json.subjects?.map((subject: any) =>
        EducationClassificationBranchModel.fromJson(subject),
      ),
      Fulltitle: json.full_title,
    });
  }

  static example: EducationClassificationBranchModel = new EducationClassificationBranchModel({
    id: 1,
    title: 'Mathematics',
    childs: [],
  });
}
