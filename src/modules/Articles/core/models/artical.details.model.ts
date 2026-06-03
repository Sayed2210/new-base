import TitleInterface from '@/base/Data/Models/titleInterface';
import ExplanationModel from './explanation.model';
import DocumentModel from './document.model';
import SubjectModel from '@/modules/Subjects/core/models/subject.model';
import ArticleSubjectModel from './Subject.model';
export default class ArticalDetailsModel {
  public readonly id: number;
  public readonly question_description: string;
  public readonly question: string;
  public readonly document: DocumentModel[];
  public readonly explanation: ExplanationModel;
  public readonly e_c_subject: TitleInterface<number>;
  public readonly created_at: string;
  public readonly created_by: TitleInterface<string>; 
  public readonly number_of_questions: number;
  public readonly Description: string;
  public readonly subject: SubjectModel;


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
    subject: SubjectModel;
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
  }

  static fromJson(json: any): ArticalDetailsModel {
    if (!json) {
      throw new Error('Cannot create ArticalDetailsModel from null or undefined');
    }
    return new ArticalDetailsModel({
      id: json.question_id ?? 0,
      question: json.question ?? '',
      question_description: json.question_description ?? '',
      document:  json.documents.map((doc: any) => DocumentModel.fromJson(doc)),
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
      subject: json.subject != null
    ? ArticleSubjectModel.fromJson(json.subject)
    : null
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
    subject: SubjectModel.example,
  });
}
