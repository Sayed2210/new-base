import { describe, it, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import questionsRepository from '../question.repository';

describe('questionsRepository', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should be defined', () => {
    expect(questionsRepository).toBeDefined();
  });

  it('should get correct instance', () => {
    const repository = questionsRepository.getInstance();
    expect(repository).toBeInstanceOf(questionsRepository);
  });
});
