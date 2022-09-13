import { STAGES, SECS_IN_MIN, FIB_NUMS } from "shared/constants"
import { MAX_SPIRAL_VALUE } from "./fib-spiral.constants"

// TODO: refactor function
// eslint-disable-next-line complexity, max-statements
export const getSpiralProgress = (seconds: number) => {
  if (seconds === SECS_IN_MIN * STAGES[0]) return 0

  if (seconds < SECS_IN_MIN * STAGES[1])
    return getCurrentStageProgress(
      seconds,
      SECS_IN_MIN * STAGES[0],
      SECS_IN_MIN * FIB_NUMS[1]
    )
  if (seconds < SECS_IN_MIN * STAGES[2])
    return getCurrentStageProgress(
      seconds,
      SECS_IN_MIN * STAGES[1],
      SECS_IN_MIN * FIB_NUMS[2]
    )
  if (seconds < SECS_IN_MIN * STAGES[3])
    return getCurrentStageProgress(
      seconds,
      SECS_IN_MIN * STAGES[2],
      SECS_IN_MIN * FIB_NUMS[3]
    )
  if (seconds < SECS_IN_MIN * STAGES[4])
    return getCurrentStageProgress(
      seconds,
      SECS_IN_MIN * STAGES[3],
      SECS_IN_MIN * FIB_NUMS[4]
    )
  if (seconds < SECS_IN_MIN * STAGES[5])
    return getCurrentStageProgress(
      seconds,
      SECS_IN_MIN * STAGES[4],
      SECS_IN_MIN * FIB_NUMS[5]
    )
  if (seconds < SECS_IN_MIN * STAGES[6])
    return getCurrentStageProgress(
      seconds,
      SECS_IN_MIN * STAGES[5],
      SECS_IN_MIN * FIB_NUMS[6]
    )
  if (seconds < SECS_IN_MIN * STAGES[7])
    return getCurrentStageProgress(
      seconds,
      SECS_IN_MIN * STAGES[6],
      SECS_IN_MIN * FIB_NUMS[7]
    )
  if (seconds < SECS_IN_MIN * STAGES[8])
    return getCurrentStageProgress(
      seconds,
      SECS_IN_MIN * STAGES[7],
      SECS_IN_MIN * FIB_NUMS[8]
    )
  if (seconds < SECS_IN_MIN * STAGES[9])
    return getCurrentStageProgress(
      seconds,
      SECS_IN_MIN * STAGES[8],
      SECS_IN_MIN * FIB_NUMS[9]
    )

  return 1 * seconds
}

export const getCurrentStageProgress = (
  totalSeconds: number,
  stageOffset: number,
  stageDuration: number
) => {
  const incrementPercent = MAX_SPIRAL_VALUE / stageDuration
  const stageValue = totalSeconds - stageOffset

  return incrementPercent * stageValue
}
