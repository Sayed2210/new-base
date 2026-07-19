import { describe, expect, it } from 'vitest';
import ContactsParams from '../contacts.paras';

describe('ContactsParams', () => {
  it('maps contact fields including the contact id', () => {
    const params = new ContactsParams({
      id: 55,
      key: 'emails',
      value: 'support@example.com',
    });

    expect(params.toMap()).toEqual({
      id: 55,
      key: 'emails',
      value: 'support@example.com',
    });
  });
});
