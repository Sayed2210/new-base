enum ValidationType {
  cityRequired,
  countryRequired,
  dateRequired,
  dateEqual,
  unknown,
}

class ValidationModel {
  public title: string = "";
  public type: ValidationType = ValidationType.unknown;

  constructor(title: string, type: ValidationType) {
    this.title = title;
    this.type = type;
  }
}

export { ValidationModel, ValidationType };
