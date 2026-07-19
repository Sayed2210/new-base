import { describe, it, expect } from 'vitest';
import { QuestionEndpoints } from './question.api.endpoints';

describe('QuestionEndpoints', () => {
  it('should have the correct prefix', () => {
    const endpoints = new QuestionEndpoints();
    // @ts-expect-error - prefix is protected
    expect(endpoints.prefix).toBe('dashboard/');
  });

  it('should have the correct endpoint URLs', () => {
    const endpoints = new QuestionEndpoints();
    expect(endpoints.index).toContain('fetch_questions');
    expect(endpoints.show).toContain('show_question');
    expect(endpoints.store).toContain('store_question');
    expect(endpoints.update).toContain('update_question');
    expect(endpoints.delete).toContain('delete_question');
  });
});
