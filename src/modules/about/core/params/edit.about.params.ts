import type Params from '@/base/Core/Params/params';
import { ClassValidation } from '@/base/Presentation/Utils/classValidation';
import type TranslationParams from './translation.params';
import type SocialParams from './Socail.params';
import isBase64 from '@/base/Presentation/Utils/is_base64';

/**
 * Parameters for editing an employee
 */
export default class EditAboutParams implements Params {
  public translations: TranslationParams;
  public images: string;
  public socialMedia: SocialParams[];

  public static readonly validation = new ClassValidation().setRules({
    translation: { required: true },
  });

  constructor(data: {
    translations: TranslationParams;
    images: string;
    socialMedia: SocialParams[];
  }) {
    this.translations = data.translations;
    this.images = data.images;
    this.socialMedia = data.socialMedia;
  }

  toMap(): { [p: string]: any } {
    return {
      translations: this.translations,
      ...(isBase64(this.images) && {
        image: this.images,
      }),
      social_links: this.socialMedia,
    };
  }

  validate() {
    return EditAboutParams.validation.validate(this);
  }

  validateOrThrow() {
    return EditAboutParams.validation.validateOrThrow(this);
  }
}
