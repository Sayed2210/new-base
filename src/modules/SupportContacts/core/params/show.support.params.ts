import type Params from '@/base/Core/Params/params';
import { ClassValidation } from '@/base/Presentation/Utils/classValidation';

/**
 * Parameters for showing an employee
 */
export default class ShowSupportContactsParams implements Params {
  public support_id: number;
  public allLocales?: boolean;
  public static readonly validation = new ClassValidation().setRules({});

  constructor(support_id: number, allLocales?: boolean) {
    this.support_id = support_id;
    this.allLocales = allLocales;
  }

  toMap(): { [p: string]: any } {
    return {
      support_id: this.support_id,
      allLocales: this.allLocales,
    };
  }

  validate() {
    return ShowSupportContactsParams.validation.validate(this);
  }

  validateOrThrow() {
    return ShowSupportContactsParams.validation.validateOrThrow(this);
  }
}
