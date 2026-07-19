import type Params from '@/base/Core/Params/params';
import { ClassValidation } from '@/base/Presentation/Utils/classValidation';
import type AttachmentsParams from './attachments.params';

export default class SolutionStepsParams implements Params {
  public explanation?: string;
  public image?: AttachmentsParams[];

  public static readonly validation = new ClassValidation().setRules({
    explanation: { required: true },
    // image: { required: true },
  });

  constructor(data: { explanation?: string; image?: AttachmentsParams[] }) {
    this.explanation = data.explanation;
    this.image = data.image;
  }

  toMap(): { [p: string]: any } {
    const attachments =
      this.image?.map((f) => f.toMap()).filter((f) => f.file && f.file.length > 0) ?? [];
    return {
      text: this.explanation,
      ...(attachments.length > 0 && {
        attachments,
      }),
    };
  }

  validate() {
    return SolutionStepsParams.validation.validate(this);
  }

  validateOrThrow() {
    return SolutionStepsParams.validation.validateOrThrow(this);
  }
}
