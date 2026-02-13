import type Params from "./params";
import type { ValidationError } from "@/base/Presentation/Utils/ClassValidation";

export default class IndexParams implements Params {
  public word: string;
  public withPage: number = 1;
  public perPage: number = 10;
  public pageNumber: number = 10;

  constructor(
    word: string,
    pageNumber: number = 1,
    perPage: number = 10,
    withPage: number = 1,
  ) {
    this.word = word;
    this.withPage = withPage;
    this.pageNumber = pageNumber;
    this.perPage = perPage;
  }

  toMap(): Record<string, string | number | number[] | null> {
    const data: Record<string, string | number | number[] | null> = {};
    if (this.word) data["word"] = this.word;
    data["paginate"] = this.withPage;
    data["page"] = this.pageNumber;
    data["limit"] = this.perPage;
    return data;
  }

  validate(): { isValid: boolean; errors: ValidationError[] } {
    const errors: ValidationError[] = [];
    if (this.pageNumber < 1) {
      errors.push({ field: "pageNumber", message: "Page number must be >= 1" });
    }
    if (this.perPage < 1) {
      errors.push({ field: "perPage", message: "Per page must be >= 1" });
    }
    return { isValid: errors.length === 0, errors };
  }

  validateOrThrow(): void {
    const { isValid, errors } = this.validate();
    if (!isValid) {
      throw new Error(errors.map((e) => e.message).join(", "));
    }
  }
}
