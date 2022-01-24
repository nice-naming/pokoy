import { MAX_SPIRAL_VALUE } from "./fib-spiral.constants"

// TODO: refactor function
// eslint-disable-next-line complexity, max-statements
export const getTimerProgress = (seconds: number) => {
  if (seconds === 0) return 0
  if (seconds < 60) return getCurrentStageProgress(seconds, 60, 0)
  if (seconds < 120) return getCurrentStageProgress(seconds, 60, 60)
  if (seconds < 180) return getCurrentStageProgress(seconds, 60, 120)
  if (seconds < 300) return getCurrentStageProgress(seconds, 120, 180)
  if (seconds < 480) return getCurrentStageProgress(seconds, 180, 300)
  if (seconds < 780) return getCurrentStageProgress(seconds, 300, 480)
  if (seconds < 1260) return getCurrentStageProgress(seconds, 480, 780)
  if (seconds < 2040) return getCurrentStageProgress(seconds, 480, 1260)
  if (seconds < 3300) return getCurrentStageProgress(seconds, 480, 2040)
  return 1 * seconds
}

function getCurrentStageProgress(
  totalSeconds: number,
  divider: number,
  stageRemainder: number
) {
  const incrementSize = MAX_SPIRAL_VALUE / divider
  const stageValue = totalSeconds - stageRemainder

  return incrementSize * stageValue
}
