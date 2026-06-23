import type Params from '@/base/Core/Params/params';
import { ClassValidation } from '@/base/Presentation/Utils/classValidation';


export default class ShowPlacementTestParams implements Params {
  public id: number;

  public static readonly validation = new ClassValidation().setRules({
    id: { required: true },
  });

  constructor(id: number) {
    this.id = id;
  }

  toMap(): { [p: string]: any } {
    return {
      placement_test_id: this.id,
    };
  }

  validate() {
    return ShowPlacementTestParams.validation.validate(this);
  }

  validateOrThrow() {
    return ShowPlacementTestParams.validation.validateOrThrow(this);
  }
}
