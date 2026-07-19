import type Params from '@/base/Core/Params/params';
import { ClassValidation } from '@/base/Presentation/Utils/classValidation';
import isBase64 from '@/base/Presentation/Utils/is_base64';

/**
 * Parameters for adding a new employee
 */
export default class SocialParams implements Params {
  public social_link_id?: number;
  public link: string;
  public icon: string;

  public static readonly validation = new ClassValidation().setRules({});

  constructor(data: { social_link_id?: number; link: string; icon: string }) {
    this.social_link_id = data.social_link_id;
    this.link = data.link;
    this.icon = data.icon;
  }

  toMap(): { [p: string]: any } {
    return {
      social_link_id: this.social_link_id,
      link: this.link,
      icon: isBase64(this.icon) ? this.icon : '',
    };
  }

  validate() {
    return SocialParams.validation.validate(this);
  }

  validateOrThrow() {
    return SocialParams.validation.validateOrThrow(this);
  }
}
