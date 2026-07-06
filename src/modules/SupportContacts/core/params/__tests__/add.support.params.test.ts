import { describe, expect, it } from 'vitest';
import TranslationParams from '@/modules/about/core/params/translation.params';
import AddSupportContactsParams from '../add.support.params';
import ContactsParams from '../contacts.paras';

describe('AddSupportContactsParams', () => {
  it('maps support id, translations, and contact payloads', () => {
    const contact = new ContactsParams({
      id: 55,
      key: 'phonenumbers',
      value: '+201234567890',
    });
    const translations = new TranslationParams({
      title: { en: 'Support', ar: 'الدعم' },
    });

    const params = new AddSupportContactsParams({
      supportId: 10,
      translations,
      contacts: [contact],
    });

    expect(params.toMap()).toEqual({
      support_id: 10,
      translations,
      support_contacts: [contact.toMap()],
    });
  });
});
