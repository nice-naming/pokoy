import React, { useCallback } from "react"
import {
  getFloorFibonacciDiscrete,
  getNextFibonacciStage,
} from "shared/utils/getNextFibonacciStage"
import { StageWrapper, Wrapper } from "./tips.styles"

interface Props {
  minutes: number
  isTimerStarted: boolean
}

// TODO: refactor component
export const Tips: React.FC<Props> = ({ minutes, isTimerStarted }) => {
  const [currentStage, setCurrentStage] = React.useState(0)

  const getNextStage = useCallback(getNextFibonacciStage, [])

  const nextStage = getNextStage(currentStage, minutes)

  // TODO: extract function
  const timerProgressToMinutes = React.useCallback(
    (minutes: number) => {
      const closestFibonacciDiscrete = getFloorFibonacciDiscrete(minutes)
      const nextStage = getNextStage(closestFibonacciDiscrete, minutes)

      const currentStage =
        minutes < closestFibonacciDiscrete
          ? nextStage
          : closestFibonacciDiscrete

      return currentStage
    },
    [getNextStage]
  )

  React.useEffect(() => {
    if (minutes) {
      const currentStage = timerProgressToMinutes(minutes)
      setCurrentStage(currentStage)
      // setNextStage(nextStage)
    }
  }, [minutes, timerProgressToMinutes])

  React.useEffect(() => {
    if (minutes === 0) {
      setCurrentStage(0)
    }
  }, [currentStage, minutes])

  return (
    <Wrapper>
      {isTimerStarted ? (
        <>
          <span>
            Completed stage is{" "}
            <StageWrapper stage={currentStage}>{currentStage}</StageWrapper>{" "}
            {currentStage === 1 ? "minute" : "minutes"}
          </span>
          <br />
          <span>
            The next stage in{" "}
            <StageWrapper stage={nextStage}>{nextStage}</StageWrapper>{" "}
            {nextStage === 1 ? "minute" : "minutes"}
          </span>
        </>
      ) : (
        <>
          <span>Press the circle to start</span>
          <br />
          <span>...</span>
        </>
      )}
    </Wrapper>
  )
}
