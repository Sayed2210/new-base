export const PlacementDifficultyLevelEnum = {
  easy: 1,
  medium: 2,
  hard: 3,
} as const;

export type PlacementDifficultyLevelEnum = (typeof PlacementDifficultyLevelEnum)[keyof typeof PlacementDifficultyLevelEnum];
