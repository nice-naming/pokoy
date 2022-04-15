import { FIBONACCI_NUMS } from "shared/constants"

export const getFibonacciDiscrete = (minute: number) => {
  const fibDiscrete = FIBONACCI_NUMS.reduce((acc, fibNum) => {
    const curDiff = Math.abs(fibNum - minute)
    const prevDiff = Math.abs(acc - minute)
    const isCloserToDiscrete = curDiff < prevDiff

    return isCloserToDiscrete ? fibNum : acc
  }, Infinity)

  return fibDiscrete
}

export const getProgressionDiscrete = (
  minute: number,
  progression: number[]
) => {
  const fibDiscrete = progression.reduce((acc, fibNum) => {
    const curDiff = Math.abs(fibNum - minute)
    const prevDiff = Math.abs(acc - minute)
    const isCloserToDiscrete = curDiff < prevDiff

    return isCloserToDiscrete ? fibNum : acc
  }, Infinity)

  return fibDiscrete
}

export const getNextFibonacciStage = (
  currentStage: number,
  minutes: number
) => {
  const nextStageIndex = FIBONACCI_NUMS.indexOf(currentStage) + 1
  const nextStage =
    currentStage > minutes ? currentStage : FIBONACCI_NUMS[nextStageIndex]
  return nextStage
}

export const getNextStageInProgression = (
  currentStage: number,
  minutes: number,
  progression: number[]
) => {
  const nextStageIndex = progression.indexOf(currentStage) + 1
  const nextStage =
    currentStage > minutes ? currentStage : progression[nextStageIndex]
  return nextStage
}

export const getFloorProgressionDiscrete = (
  minutes: number,
  progression: number[]
) => {
  const checkDiscrete = (acc: number, fibNum: number, index: number) => {
    const curDiff = Math.abs(fibNum - minutes)
    const prevDiff = Math.abs(acc - minutes)
    const isLessThanMinutes = minutes >= fibNum
    const isCloserToDiscrete = curDiff < prevDiff
    const closestFib = isCloserToDiscrete ? fibNum : acc

    return isLessThanMinutes ? closestFib : acc
  }

  const fibDiscrete = progression.reduce(checkDiscrete, 0)

  return fibDiscrete
}
