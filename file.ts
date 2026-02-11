import DialogSelector from "../Dialogs/dialog_selector";
import warning from "@/assets/images/warning.png";

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
}

// Logic that depends on multiple keys
export type CrossFieldValidator = (obj: any) => boolean | string;

export interface ValidationErrorItem {
  field: string;
  message: string;
}

export class ClassValidation {
  private rules: Map<string, ValidationRule> = new Map();
  private crossRules: CrossFieldValidator[] = [];

  /**
   * Set basic rules for individual fields
   */
  setRules(rules: Record<string, ValidationRule>): this {
    Object.entries(rules).forEach(([field, rule]) => {
      this.rules.set(field, rule);
    });
    return this;
  }

  /**
   * Add logic where keys depend on one another
   * Example: if name is 'X', email must be 'Y'
   */
  addCrossRule(validator: CrossFieldValidator): this {
    this.crossRules.push(validator);
    return this;
  }

  validate(obj: any): { isValid: boolean; errors: ValidationErrorItem[] } {
    const errors: ValidationErrorItem[] = [];

    // 1. Validate individual fields
    this.rules.forEach((rule, field) => {
      const value = obj[field];

      if (rule.required && this.isEmpty(value)) {
        errors.push({ field, message: `is required` });
        return;
      }

      if (!rule.required && this.isEmpty(value)) return;

      if (
        rule.minLength &&
        typeof value === "string" &&
        value.length < rule.minLength
      ) {
        errors.push({
          field,
          message: `must be at least ${rule.minLength} chars`,
        });
      }

      if (
        rule.pattern &&
        typeof value === "string" &&
        !rule.pattern.test(value)
      ) {
        errors.push({ field, message: `format is invalid` });
      }

      // ... (Add min/max numeric checks here if needed)
    });

    // 2. Validate Cross-Field dependencies
    this.crossRules.forEach((validator) => {
      const result = validator(obj);
      if (result !== true) {
        errors.push({
          field: "Validation",
          message:
            typeof result === "string" ? result : `Logic requirement not met`,
        });
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  validateOrThrow(obj: any): void {
    const { isValid, errors } = this.validate(obj);
    if (!isValid) {
      const errorInstance = new ValidationError(errors);
      errorInstance.openDialog();
      throw errorInstance; // Stop execution in the controller
    }
  }

  private isEmpty(value: any): boolean {
    return (
      value === null ||
      value === undefined ||
      (typeof value === "string" && value.trim() === "") ||
      (Array.isArray(value) && value.length === 0)
    );
  }
}

/**
 * Custom Error Class for Dialog Handling
 */
export class ValidationError extends Error {
  constructor(public errors: ValidationErrorItem[]) {
    const msg = errors.map((e) => `${e.field}: ${e.message}`).join(", ");
    super(msg);
    this.name = "ValidationError";
  }

  openDialog() {
    DialogSelector.instance.failedDialog.openDialog({
      dialogName: "dialog",
      titleContent: "Validation Error",
      imageElement: warning,
      messageContent: this.errors
        .map((e) => `${e.field} ${e.message}`)
        .join(" | "),
    });
  }
}


  public static readonly validation = new ClassValidation()
    .setRules({
      name: { required: true, minLength: 2 },
      phone: { required: true, pattern: /^\+?[\d\s-()]+$/ },
      email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    })
    .addCrossRule((obj: AddOrganizatoinEmployeeParams) => {
      if (obj.name === 'aa') {
        return "For user 'example', the email must be 'example@asd.com'"
      }
      return true
    })
    .addCrossRule((obj: AddOrganizatoinEmployeeParams) => {
      if (obj.password !== obj.passwordConfirmation) {
        return 'Passwords do not match'
      }
      return true
    })
    .addCrossRule((obj: AddOrganizatoinEmployeeParams) => {
      if (obj.name === 'aa') {
        return "For user 'example', the email must be 'example@asd.com'"
      }
      return true
    })

  validateOrThrow() {
    AddOrganizatoinEmployeeParams.validation.validateOrThrow(this)
  }