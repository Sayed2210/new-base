export const QuestionStatusRejectAbroveEnum = {
  PENDING: 1,
  APPROVED: 2,
  REJECTED: 3,
} as const;

export type QuestionStatusRejectAbroveEnum =
  (typeof QuestionStatusRejectAbroveEnum)[keyof typeof QuestionStatusRejectAbroveEnum];
