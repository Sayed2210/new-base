import TitleInterface from "@/base/Data/Models/titleInterface";


export default class QuestionAnswerAnalysisModel {
  public readonly question?: TitleInterface<number>;
  public readonly questionAnswerDuration?: number;


  constructor(data: {
    question?:  TitleInterface<number>;
    questionAnswerDuration?: number;

  }) {
    this.question = data.question;
    this.questionAnswerDuration = data.questionAnswerDuration;
  }

  static fromJson(json: any): QuestionAnswerAnalysisModel {
    if (!json) {
      throw new Error('Cannot create QuestionAnswerAnalysisModel from null or undefined');
    }

    return new QuestionAnswerAnalysisModel({
      question: json.question,
      questionAnswerDuration: json.question_answer_duration,

    });
  }

  static example: QuestionAnswerAnalysisModel = new QuestionAnswerAnalysisModel({
    question: TitleInterface.example,
    questionAnswerDuration: 120,
  });
}
