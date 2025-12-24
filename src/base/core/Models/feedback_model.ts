export default class FeedbackModel {
  public locale: string;
  public feedback: string;

  constructor(locale: string, description: string) {
    this.locale = locale;
    this.feedback = description;
  }

  static fromData(data: any): FeedbackModel {
    return new FeedbackModel(data.locale, data.feedback);
  }
}
