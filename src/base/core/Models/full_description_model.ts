export default class FullDescriptionModel {
  public locale: string;
  public full_description: string;

  constructor(locale: string, full_description: string) {
    this.locale = locale;
    this.full_description = full_description;
  }

  static fromData(data: any): FullDescriptionModel {
    return new FullDescriptionModel(data.locale, data.full_description);
  }
}
