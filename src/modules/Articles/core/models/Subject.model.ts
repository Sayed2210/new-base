export default class ArticleSubjectModel {
  public readonly curriculum: string;
  public readonly cycle: string;
  public readonly grade: string;
  public readonly subSubject: string;

  constructor(data: { curriculum?: string; cycle?: string; grade?: string; subSubject?: string }) {
    this.curriculum = data.curriculum || '';
    this.cycle = data.cycle || '';
    this.grade = data.grade || '';
    this.subSubject = data.subSubject || '';
  }

  static fromJson(json: any): ArticleSubjectModel {
    if (!json) return new ArticleSubjectModel({});
    return new ArticleSubjectModel({
      curriculum: json.curriculum ?? json.governmental ?? '',
      cycle: json.cycle ?? json.primary ?? '',
      grade: json.grade ?? json.first ?? '',
      subSubject: json.subSubject ?? json.first ?? '',
    });
  }

  static example = new ArticleSubjectModel({
    curriculum: 'Governmental',
    cycle: 'Primary',
    grade: 'First',
    subSubject: 'Arabic',
  });

  static example2 = new ArticleSubjectModel({
    curriculum: 'International',
    cycle: 'Secondary',
    grade: 'Second',
    subSubject: 'Math',
  });

  static example3 = new ArticleSubjectModel({
    curriculum: 'Experimental',
    cycle: 'Preparatory',
    grade: 'Third',
    subSubject: 'Science',
  });
}
