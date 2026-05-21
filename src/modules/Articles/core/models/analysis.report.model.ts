
import ArticleImage from '@/assets/images/image 22.png';
export default class AnalysisReportModel {
  public readonly id: number;
  public readonly title: string;
  public readonly count: number;
  public readonly imageUrl: string;
  public readonly percentage?: number;

  constructor(data: {
    id: number;
    title: string;
    count: number;
    imageUrl: string;
    percentage?: number;
  }) {
    this.id = data.id || 0;
    this.title = data.title || '';
    this.count = data.count || 0;
    this.imageUrl = data.imageUrl || '';
    this.percentage = data.percentage || 0;
  }

  static fromJson(json: any): AnalysisReportModel {
    if (!json) {
      throw new Error('Cannot create AnalysisReportModel from null or undefined');
    }
    return new AnalysisReportModel({
      id: json.id ?? json.id ?? 0,
      title: json.title ?? json.title ?? '',
      count: json.count ?? json.count ?? 0,
      imageUrl: json.imageUrl ?? json.imageUrl ?? '',
      percentage: json.percentage ?? json.percentage ?? 0,
    });
  }

  static example = [
    new AnalysisReportModel({
      id: 1,
      title: 'Exam frequency',
      count: 10,
      imageUrl: ArticleImage,
    }),
    new AnalysisReportModel({
      id: 2,
      title: 'Exam frequency',
      count: 10,
      imageUrl: ArticleImage,
    }),
    new AnalysisReportModel({
      id: 3,
      title: 'Exam frequency',
      count: 10,
      imageUrl: ArticleImage,
     percentage: 50,

    }),
  ];

}
