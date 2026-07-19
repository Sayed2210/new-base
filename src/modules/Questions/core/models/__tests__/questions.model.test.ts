import { describe, it, expect } from 'vitest';
import questionsModel from '../questions.model';
import { QuestionGeneratedByEnum } from '../../constant/generatedby.enum';
import { QuestionDifficultyEnum } from '../../constant/question.difficulty.enum';
import { QuestionStatusEnum } from '../../constant/question.status.enum';
import { QuestionTypeEnum } from '../../constant/question.type.enum';

describe('questionsModel', () => {
  const mockJson = {
    question_id: 1,
    question: 'Jane Doe',
    from_source_type: QuestionGeneratedByEnum.manual,
    question_type: QuestionTypeEnum.mcq,
    difficulty_level: QuestionDifficultyEnum.easy,
    review_status: QuestionStatusEnum.not_Reviewd,
    e_c_subject: { id: 1, title: 'Science' },
    number_of_questions: 10,
    e_c_branch: { id: 1, title: 'Science' },
  };

  it('should create an instance correctly from constructor', () => {
    const data = {
      id: 1,
      title: 'John Doe',
      generatedBy: QuestionGeneratedByEnum.manual,
      questionType: QuestionTypeEnum.mcq,
      difficulty: QuestionDifficultyEnum.easy,
      status: QuestionStatusEnum.not_Reviewd,
      subjects: { id: 1, title: 'Math' },
      noOfQs: 10,
      e_c_branch: { id: 1, title: 'Math' },
    };
    const model = new questionsModel(data);

    expect(model.title).toBe('John Doe');
    expect(model.id).toBe(1);
  });

  it('should create an instance correctly from fromJson', () => {
    const model = questionsModel.fromJson(mockJson);

    expect(model.id).toBe(1);
    expect(model.title).toBe('Jane Doe');
    expect(model.status).toBe(QuestionStatusEnum.not_Reviewd);
  });

  it('should throw error if json is null in fromJson', () => {
    expect(() => questionsModel.fromJson(null)).toThrow();
  });

  it('should have a valid example', () => {
    expect(questionsModel.example).toBeInstanceOf(questionsModel);
    expect(questionsModel.example.title).toBe('What is the capital of Egypt? ');
  });
});
