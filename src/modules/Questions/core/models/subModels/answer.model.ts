import { AnswerEvaluationTypeEnum } from '../../constant/answer.evaluation.type.enum';

export default class AnswerModel {
  public id?: number;
  public answer?: string;
  public image?: string;
  public is_right_answer?: boolean;
  public match?: string;
  public rank?: number;
  public similar?: string;
  public EvaluationType?: AnswerEvaluationTypeEnum;

  constructor(data: {
    id?: number;
    answer?: string;
    image?: string;
    is_right_answer?: boolean;
    match?: string;
    rank?: number;
    similar?: string;
    EvaluationType?: AnswerEvaluationTypeEnum;
  }) {
    this.id = data.id;
    this.answer = data.answer || '';
    this.image = data.image || '';
    this.is_right_answer = data.is_right_answer || false;
    this.match = data.match || '';
    this.rank = data.rank || 0;
    this.similar = data.similar || '';
    this.EvaluationType = data.EvaluationType || AnswerEvaluationTypeEnum.similar;

    Object.freeze(this);
  }

  static fromJson(json: any): AnswerModel {
    if (!json) {
      throw new Error('Cannot create AnswerModel from null or undefined');
    }

    return new AnswerModel({
      id: json.id,
      answer: json.answer,
      image: json.image,
      is_right_answer: json.is_right_answer,
      match: json.match,
      rank: json.rank,
      similar: json.similar,
      EvaluationType: json.evaluation_type,
    });
  }

  static example: AnswerModel = new AnswerModel({
    answer: 'answer',
    image: `https://cyber.comolho.com/static/img/avatar.png`,
    is_right_answer: true,
    match: 'match',
    rank: 10,
    similar: 'similar',
    EvaluationType: AnswerEvaluationTypeEnum.similar,
  });
}
