import type Params from '@/base/Core/Params/params';
import { ClassValidation } from '@/base/Presentation/Utils/classValidation';

/**
 * Parameters for adding a new employee
 */
export default class ContactsParams implements Params {
  public readonly key: string;
  public readonly value: string;
  public readonly id?: number;

  public static readonly validation = new ClassValidation().setRules({});

  constructor(data: { key: string; value: string; id?: number }) {
    this.key = data.key;
    this.value = data.value;
    this.id = data.id;
  }

  toMap(): { [p: string]: any } {
    return {
      key: this.key,
      value: this.value,
      id: this.id,
    };
  }

  validate() {
    return ContactsParams.validation.validate(this);
  }

  validateOrThrow() {
    return ContactsParams.validation.validateOrThrow(this);
  }
}
