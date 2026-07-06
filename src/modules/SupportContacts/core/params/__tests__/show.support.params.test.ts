import { describe, expect, it } from 'vitest';
import ShowSupportContactsParams from '../show.support.params';

describe('ShowSupportContactsParams', () => {
  it('maps support id and locale flag', () => {
    const params = new ShowSupportContactsParams(10, true);

    expect(params.toMap()).toEqual({
      support_id: 10,
      allLocales: true,
    });
  });
});
