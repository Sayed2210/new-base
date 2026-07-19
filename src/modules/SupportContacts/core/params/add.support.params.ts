import type Params from '@/base/Core/Params/params';
import { ClassValidation } from '@/base/Presentation/Utils/classValidation';
import type ContactsParams from './contacts.paras';
import type TranslationParams from '@/modules/about/core/params/translation.params';

/**
 * Parameters for adding a new employee
 */
export default class AddSupportContactsParams implements Params {
  public readonly translations: TranslationParams;
  public readonly contacts: ContactsParams[];
  public readonly supportId?: number;

  public static readonly validation = new ClassValidation().setRules({});

  constructor(data: {
    translations: TranslationParams;
    contacts: ContactsParams[];
    supportId?: number;
  }) {
    this.translations = data.translations;
    this.contacts = data.contacts;
    this.supportId = data.supportId;
  }

  toMap(): { [p: string]: any } {
    return {
      // ...(this.supportId ? { support_id: this.supportId } : {}),
      support_id: this.supportId,
      translations: this.translations,
      support_contacts: this.contacts.map((contact) => contact.toMap()),
    };
  }

  validate() {
    return AddSupportContactsParams.validation.validate(this);
  }

  validateOrThrow() {
    return AddSupportContactsParams.validation.validateOrThrow(this);
  }
}
