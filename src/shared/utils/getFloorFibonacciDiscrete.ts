import { FIBONACCI_NUMS } from "shared/constants"

export const getFloorFibonacciDiscrete = (minutes: number) => {
  const checkDiscrete = (acc: number, fibNum: number, index: number) => {
    const curDiff = Math.abs(fibNum - minutes)
    const prevDiff = Math.abs(acc - minutes)
    const isLessThanMinutes = minutes >= fibNum
    const isCloserToDiscrete = curDiff < prevDiff
    const closestFib = isCloserToDiscrete ? fibNum : acc

    return isLessThanMinutes ? closestFib : acc
  }
  const fibDiscrete = FIBONACCI_NUMS.reduce(checkDiscrete, 0)

  return fibDiscrete
}
