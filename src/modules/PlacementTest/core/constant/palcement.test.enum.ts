export const PlacementTestEnum = {
  completed: 1,
  inprogress: 2,
  rejected: 3,
} as const;

export type PlacementTestEnum = (typeof PlacementTestEnum)[keyof typeof PlacementTestEnum];
