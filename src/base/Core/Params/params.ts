// import type { ValidationError } from "@/base/Presentation/Utils/class_validation";

import type { ValidationError } from "@/base/Presentation/Utils/ClassValidation";

export default interface Params {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toMap(): { [key: string]: any };
  validate(): { isValid: boolean; errors: ValidationError[] };
  validateOrThrow(): void;
}
