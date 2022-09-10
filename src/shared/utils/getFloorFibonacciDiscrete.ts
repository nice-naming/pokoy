import { STAGES } from "shared/constants"

// TODO: problem something there
export const getFloorFibonacciDiscrete = (minutes: number) => {
  const fibDiscrete = STAGES.reduce(
    (acc, fibNum, index) => checkDiscrete(acc, fibNum, index, minutes),
    0
  )

  return fibDiscrete
}

const checkDiscrete = (
  acc: number,
  fibNum: number,
  index: number,
  minutes: number
) => {
  const curDiff = Math.abs(fibNum - minutes)
  const prevDiff = Math.abs(acc - minutes)
  const isLessThanMinutes = minutes >= fibNum

  const isCloserToDiscrete = curDiff < prevDiff
  const closestFib = isCloserToDiscrete ? fibNum : acc

  return isLessThanMinutes ? closestFib : acc
}
