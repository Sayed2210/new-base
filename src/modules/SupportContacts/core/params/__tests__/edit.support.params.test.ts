import { describe, expect, it } from 'vitest';
import TranslationParams from '@/modules/about/core/params/translation.params';
import EditSupportContactsParams from '../edit.support.params';

describe('EditSupportContactsParams', () => {
  it('maps edit support contacts payload', () => {
    const translation = new TranslationParams({
      title: { en: 'Support', ar: 'الدعم' },
    });

    const params = new EditSupportContactsParams({
      id: 10,
      translation,
      phonenumbers: ['+201234567890'],
      whatsAppNumebrs: ['+201234567891'],
      emails: ['support@example.com'],
      telegramNumbers: ['https://t.me/support'],
    });

    expect(params.toMap()).toEqual({
      support_id: 10,
      translations: translation.toMap(),
      phone_numbers: ['+201234567890'],
      whatsapp_numbers: ['+201234567891'],
      emails: ['support@example.com'],
      telegram_numbers: ['https://t.me/support'],
    });
  });
});
