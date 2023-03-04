export const FEATURE_NAME = "userStats"

export const INIT_TOTAL_DURATION = 0
export const SECONDARY_AXIS_LABEL = "Daily duration"
export const TERTIARY_AXIS_LABEL = "Total duration"
export const THIRD_PART = 0.3
export const MAX_DAYS_DATA_LENGTH = 90
export const MAX_DAYS_DATA_LENGTH_WITH_FORESIGHT =
  MAX_DAYS_DATA_LENGTH * (1 + THIRD_PART)
export const PRACTICE_HOURS_PROGRESSION = [
  1, 2, 3, 5, 8,

  13, 21, 34, 55, 89,

  100, 200, 300, 500, 800,

  1000, 2000, 3000, 5000, 8000,

  10000, 20000, 30000, 50000, 80000,
]
