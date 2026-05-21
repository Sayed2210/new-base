import ArticalDetailsQuestionModel from './artical.details.questions.model';
import ArticleSubjectModel from './Subject.model';
import AnalysisReportModel from './analysis.report.model';
export default class ArticalDetailsModel {
  public readonly id: number; 
  public readonly createdAt: string;
  public readonly createdBy: string;
  public readonly title: string;
  public readonly Description: string;
  public readonly NumberOfQuestions: number;
  public readonly ExamFrequency: number;
  public readonly trainingFrequency: number;
  public readonly SkippedCount: number;
  public readonly subject: ArticleSubjectModel;
  public readonly articalQuestions: ArticalDetailsQuestionModel[];
  public readonly articleDocument: string;
  public readonly articlesource: string;
  public readonly analysisReport: AnalysisReportModel[];


  constructor(data: {
    id: number;
    createdAt: string;
    createdBy: string;
    title: string;
    Description: string;
    NumberOfQuestions: number;
    ExamFrequency: number;
    trainingFrequency: number;
    SkippedCount: number;
    subject : ArticleSubjectModel;
    articalQuestions : ArticalDetailsQuestionModel[];
    articleDocument: string;
    articlesource: string;
    analysisReport: AnalysisReportModel[];
  }) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.createdBy = data.createdBy;
    this.title = data.title;
    this.Description = data.Description;
    this.NumberOfQuestions = data.NumberOfQuestions;
    this.ExamFrequency = data.ExamFrequency;
    this.trainingFrequency = data.trainingFrequency;
    this.SkippedCount = data.SkippedCount;
    this.subject = data.subject;
    this.articalQuestions = data.articalQuestions;
    this.articleDocument = data.articleDocument;
    this.articlesource = data.articlesource;
    this.analysisReport =data.analysisReport;
  }

  static fromJson(json: any): ArticalDetailsModel {
    if (!json) {
      throw new Error('Cannot create ArticalDetailsModel from null or undefined');
    }
    return new ArticalDetailsModel({
      id: json.id ?? json.id ?? 0,
      createdAt: json.createdAt ?? json.createdAt ?? '',
      createdBy: json.createdBy ?? json.createdBy ?? '',
      title: json.title ?? json.title ?? '',
      Description: json.Description ?? json.Description ?? '',
      NumberOfQuestions: json.NumberOfQuestions ?? json.NumberOfQuestions ?? 0,
      ExamFrequency: json.ExamFrequency ?? json.ExamFrequency ?? 0,
      trainingFrequency: json.trainingFrequency ?? json.trainingFrequency ?? 0,
      SkippedCount: json.SkippedCount ?? json.SkippedCount ?? 0,
      subject: ArticleSubjectModel.fromJson(json.subject),
      articalQuestions: json.articalQuestions?.map((answer: any) => ArticalDetailsQuestionModel.fromJson(answer)) ?? [],
      articleDocument: json.articleDocument ?? json.articleDocument ?? '',
      articlesource: json.articlesource ?? json.articlesource ?? '',
      analysisReport: json.analysisReport?.map((answer: any) => AnalysisReportModel.fromJson(answer)) ?? [],
    });
  }

  static example = new ArticalDetailsModel({
    id: 1,
    createdAt: '2022-01-01',
    createdBy: 'John Doe',
    title: 'Article 1',
    Description: `Egypt is a country located in North Africa.It is famous for its ancient civilization and historical landmarks such as the Pyramids and the Nile River. Cairo is the capital of Egypt and one of the largest cities in Africa. The Nile River is the longest river in the world and plays an important role in agriculture and daily life in Egypt. Many tourists visit Egypt every year to explore its rich history and culture.`,
    NumberOfQuestions: 10,
    ExamFrequency: 5,
    trainingFrequency: 3,
    SkippedCount: 2,
    subject: ArticleSubjectModel.example,
    articalQuestions: [ArticalDetailsQuestionModel.example],
    articleDocument: 'book',
    articlesource: 'school book page 25',
    analysisReport: AnalysisReportModel.example,
  });

  // static example2 = new ArticalDetailsModel({
  //   id: 2,
  //   createdAt: '2022-01-01',
  //   createdBy: 'John Doe',
  //   title: 'Article 2',
  //   Description: 'Description 2',
  //   NumberOfQuestions: 20,
  //   ExamFrequency: 10,
  //   trainingFrequency: 6,
  //   SkippedCount: 4,
  // });

  // static example3 = new ArticalDetailsModel({
  //   id: 3,
  //   createdAt: '2022-01-01',
  //   createdBy: 'John Doe',
  //   title: 'Article 3',
  //   Description: 'Description 3',
  //   NumberOfQuestions: 30,
  //   ExamFrequency: 15,
  //   trainingFrequency: 9,
  //   SkippedCount: 6,
  // });
}
