import type Params from "./params";
import type { ValidationError } from "@/base/Presentation/Utils/ClassValidation";

export default class BaseIdParams implements Params {
  id: number;

  constructor(id: number) {
    this.id = id;
  }

  toMap(): { [key: string]: any } {
    const map: { [key: string]: any } = {};
    map["id"] = this.id;
    return map;
  }

  validate(): { isValid: boolean; errors: ValidationError[] } {
    const errors: ValidationError[] = [];
    if (this.id === undefined || this.id === null || this.id <= 0) {
      errors.push({ field: "id", message: "ID must be a positive number" });
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
