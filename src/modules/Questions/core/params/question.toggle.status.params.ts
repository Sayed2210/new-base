import type Params from '@/base/Core/Params/params';
import { ClassValidation } from '@/base/Presentation/Utils/classValidation';
import type { QuestionStatusRejectAbroveEnum } from '../constant/question.status.reject.abrove.enum';

/**
 * Parameters for showing an employee
 */
export default class ToggleQuestionStatusParams implements Params {
  public id: number;
  public status: QuestionStatusRejectAbroveEnum;

  public static readonly validation = new ClassValidation().setRules({
    id: { required: true },
    status: { required: true },
  });

  constructor(data: { id: number; status: QuestionStatusRejectAbroveEnum }) {
    this.id = data.id;
    this.status = data.status;
  }

  toMap(): { [p: string]: any } {
    return {
      question_id: this.id,
      review_status: this.status,
    };
  }

  validate() {
    return ToggleQuestionStatusParams.validation.validate(this);
  }

  validateOrThrow() {
    return ToggleQuestionStatusParams.validation.validateOrThrow(this);
  }
}
