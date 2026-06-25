export default class EducationClassificationSubjectModel {
  public readonly id?: number;
  public readonly title?: string;
  public readonly childs?: EducationClassificationSubjectModel[];
  public readonly subjects?: EducationClassificationSubjectModel[];
  public readonly fullTitle?: string;

  constructor(data: {
    id?: number;
    title?: string;
    childs?: EducationClassificationSubjectModel[];
    subjects?: EducationClassificationSubjectModel[];
    fullTitle?: string;
  }) {
    this.id = data.id;
    this.title = data.title;
    this.childs = data.childs;
    this.subjects = data.subjects;
    this.fullTitle = data.fullTitle;
    Object.freeze(this);
  }

  static fromJson(json: any): EducationClassificationSubjectModel {
    if (!json) {
      throw new Error('Cannot create EducationClassificationSubjectModel from null or undefined');
    }

    return new EducationClassificationSubjectModel({
      id: json.id,
      title: json.title,
      childs: json.children?.map((child: any) =>
        EducationClassificationSubjectModel.fromJson(child),
      ),
      subjects: json.subjects?.map((subject: any) =>
        EducationClassificationSubjectModel.fromJson(subject),
      ),
      fullTitle: json.full_title,
    });
  }

  static example: EducationClassificationSubjectModel = new EducationClassificationSubjectModel({
    id: 1,
    title: 'Mathematics',
    childs: [],
    fullTitle: 'a -> b-> c',
  });
}
