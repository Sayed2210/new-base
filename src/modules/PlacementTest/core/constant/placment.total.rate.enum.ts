export const PlacementTotalRateEnum = {
  good: 1,
  excellent: 2,
} as const;

export type PlacementTotalRateEnum = (typeof PlacementTotalRateEnum)[keyof typeof PlacementTotalRateEnum];
