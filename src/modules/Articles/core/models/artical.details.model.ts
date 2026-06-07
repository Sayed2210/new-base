import TitleInterface from '@/base/Data/Models/titleInterface';
import ExplanationModel from './explanation.model';
import DocumentModel from './document.model';
import ArticleSubjectModel from './Subject.model';
import AnalysisReportModel from './analysis.report.model';
import ArticleCardModel from './article.card';
import { ArticleDifficultyEnum } from '../constant/Article.difficulty.enum';
import { ArticleTypeEnum } from '../constant/Article.type.enum';
import ShowQuestionsModel from '@/modules/Questions/core/models/show.questions.model';
export default class ArticalDetailsModel {
  public readonly id: number;
  public readonly question_description: string;
  public readonly question: string;
  public readonly document: DocumentModel[];
  public readonly explanation: ExplanationModel;
  public readonly e_c_subject: TitleInterface<number>;
  public readonly created_at: string;
  public readonly articledifficulty: ArticleDifficultyEnum;
  public readonly question_type: ArticleTypeEnum;
  public readonly created_by: TitleInterface<string>; 
  public readonly number_of_questions: number;
  public readonly Description: string;
  public readonly subject: ArticleSubjectModel;
  public readonly analysisReport: AnalysisReportModel[];
  public readonly articlecard: ArticleCardModel[];
  public readonly questions: ShowQuestionsModel[];


  constructor(data: {
    id: number;
    question_description: string;
    question: string;
    document: DocumentModel[];
    explanation: ExplanationModel;
    e_c_subject: TitleInterface<number>;
    created_at: string;
    created_by: TitleInterface<string>;
    number_of_questions: number;
    Description: string;
    subject: ArticleSubjectModel;
    analysisReport: AnalysisReportModel[];
    articlecard: ArticleCardModel[];
    questions: ArticalDetailsModel[];
    articledifficulty: ArticleDifficultyEnum;
    question_type: ArticleTypeEnum;
  }) {
    this.id = data.id;
    this.question = data.question;
    this.question_description = data.question_description;
    this.document = data.document;
    this.explanation = data.explanation;
    this.e_c_subject = data.e_c_subject;
    this.created_at = data.created_at;
    this.created_by = data.created_by;
    this.number_of_questions = data.number_of_questions;
    this.Description = data.Description;
    this.subject = data.subject;
    this.analysisReport = data.analysisReport;
    this.articlecard = data.articlecard;
    this.questions = data.questions 
    this.articledifficulty = data.articledifficulty;
    this.question_type = data.question_type;
  }

  static fromJson(json: any): ArticalDetailsModel {
    if (!json) {
      throw new Error('Cannot create ArticalDetailsModel from null or undefined');
    }
    return new ArticalDetailsModel({
      id: json.question_id ?? 0,
      question: json.question ?? '',
      question_description: json.question_description ?? '',
      // document:  json.documents.map((doc: any) => DocumentModel.fromJson(doc)),
      document: json.documents?.map((doc: any) => DocumentModel.fromJson(doc)) ?? [],
      explanation: ExplanationModel.fromJson(json.explanation),
      e_c_subject: new TitleInterface({
        id: json.e_c_subject?.e_c_subject_id,
        title: json.e_c_subject?.title ?? '',
      }),
      created_at: json.created_at ?? '',
      created_by: new TitleInterface({
        id: json.created_by?.id,
        title: json.created_by?.name ?? '',
      }),
      number_of_questions: json.number_of_questions ?? 0,
      Description: json.description ?? '',
      subject: json.e_c_branch != null
    ? ArticleSubjectModel.fromJson(json.e_c_branch)
    : ArticleSubjectModel.example,
    analysisReport: json.analysis_report != null
    ? json.analysis_report.map((report: any) => AnalysisReportModel.fromJson(report))
    : [],
    articlecard: json.article_card != null
    ? json.article_card.map((card: any) => ArticleCardModel.fromJson(card))
    : [],
    questions: json.questions != null
    ? json.questions.map((question: any) => ShowQuestionsModel.fromJson(question))
    : [],
    articledifficulty: json.difficulty_level,
    question_type: json.question_type,
    });
  }

  static example = new ArticalDetailsModel({
    id: 1,
    question: 'Egypt is a country located in North Africa.It is famous for its ancient civilization and historical landmarks such as the Pyramids and the Nile River. Cairo is the capital of Egypt and one of the largest cities in Africa. The Nile River is the longest river in the world and plays an important role in agriculture and daily life in Egypt. Many tourists visit Egypt every year to explore its rich history and culture.',
    question_description: 'Egypt is a country located in North Africa.It is famous for its ancient civilization and historical landmarks such as the Pyramids and the Nile River. Cairo is the capital of Egypt and one of the largest cities in Africa. The Nile River is the longest river in the world and plays an important role in agriculture and daily life in Egypt. Many tourists visit Egypt every year to explore its rich history and culture.',
    document: [DocumentModel.example],
    explanation: ExplanationModel.example,
    e_c_subject: new TitleInterface({
      id: 1,
      title: 'Subject 1',
    }),
    created_at: '2022-01-01',
    created_by: new TitleInterface({
      id: 1,
      title: 'User 1',
    }),
    number_of_questions: 555,
    Description: 'Description 1',
    subject: ArticleSubjectModel.example,
    analysisReport: [
      {
        id: 1,
        title: 'Analysis Report 1',
        count: 1,
        percentage: 1,
        imageUrl: 'https://example.com/image.jpg',
      },
    ],
    articlecard: [
      {
        id: 2,
        title: 'Analysis Report 2',
        count: 12,
        percentage: 1,
        imageUrl: 'https://example.com/image.jpg',
      },
    ],
    questions: [
      {
        id: 3,
        title: 'Question 3',
        description: 'Question 3 Description',
        document: [DocumentModel.example],
        explanation: ExplanationModel.example,
        e_c_subject: new TitleInterface({
          id: 3,
          title: 'Subject 3',
        }),
        created_at: '2022-01-03',
        created_by: new TitleInterface({
          id: 3,
          title: 'User 3',
        }),
        number_of_questions: 333,
        Description: 'Description 3',
        subject: ArticleSubjectModel.example,
        analysisReport: [
          {
            id: 3,
            title: 'Analysis Report 3',
            count: 3,
            percentage: 3,
            imageUrl: 'https://example.com/image.jpg',
          },
        ],
        articlecard: [
          {
            id: 4,
            title: 'Analysis Report 4',
            count: 444,
            percentage: 4,
            imageUrl: 'https://example.com/image.jpg',
          },
        ],
        questions: [
          {
            id: 5,
            title: 'Question 5',
            description: 'Question 5 Description',
            document: [DocumentModel.example],
            explanation: ExplanationModel.example,
            e_c_subject: new TitleInterface({
              id: 5,
              title: 'Subject 5',
            }),
            created_at: '2022-01-05',
            created_by: new TitleInterface({
              id: 5,
              title: 'User 5',
            }),
            number_of_questions: 555,
            Description: 'Description 5',
            subject: ArticleSubjectModel.example,
            analysisReport: [
              {
                id: 5,
                title: 'Analysis Report 5',
                count: 5,
                percentage: 5,
                imageUrl: 'https://example.com/image.jpg',
              },
            ],
            articlecard: [
              {
                id: 6,
                title: 'Analysis Report 6',
                count: 666,
                percentage: 6,
                imageUrl: 'https://example.com/image.jpg',
              },
            ],
            questions: [],
          },
        ],
        articledifficulty: ArticleDifficultyEnum.easy,
        question_type: ArticleTypeEnum.mcq,
      },
    ],
  });
}
