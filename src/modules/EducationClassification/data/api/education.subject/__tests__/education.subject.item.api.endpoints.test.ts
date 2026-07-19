import { describe, expect, it } from 'vitest';
import { EducationSubjectItemEndpoints } from '../education.subject.item.api.endpoints';

describe('EducationSubjectItemEndpoints', () => {
  const endpoints = new EducationSubjectItemEndpoints();

  it('builds URLs with the dashboard prefix', () => {
    expect(endpoints.index).toContain('dashboard/fetch_education_classification_subjects');
    expect(endpoints.store).toContain('dashboard/store_education_classification_subject');
    expect(endpoints.update).toContain('dashboard/update_education_classification_subject');
    expect(endpoints.delete).toContain('dashboard/delete_education_classification_subject');
  });
});
