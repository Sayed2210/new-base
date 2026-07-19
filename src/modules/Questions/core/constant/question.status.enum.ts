export const QuestionStatusEnum = {
  PENDING: 1,
  APPROVED: 2,
  REJECTED: 3,
} as const;

export type QuestionStatusEnum = (typeof QuestionStatusEnum)[keyof typeof QuestionStatusEnum];
