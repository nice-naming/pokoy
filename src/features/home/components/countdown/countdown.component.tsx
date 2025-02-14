import React from "react"
import { CheckMark } from "shared/components/check-mark/check-mark.component"
import { StyledTooltip } from "shared/components/styled-tooltip.styles"
import { STAGES, SECS_IN_MIN } from "shared/constants"
import { getFibonacciDiscrete } from "shared/utils/getNextFibonacciStage"
import { useAppSelector } from "store"
import { StyledCountdown } from "./countdown.styles"
import { remainTimeToDigitClock } from "./remainTimeToDigitClock"

interface Props {
  seconds: number
}

export const Countdown: React.FC<Props> = ({ seconds }) => {
  const [secondsRemain, setSecondsRemain] = React.useState(0)
  const [minutesRemain, setMinutesRemain] = React.useState(0)
  const [timeRemain, setTimeRemain] = React.useState("00:00")
  const status = useAppSelector((state) => state.mainScreen.status)

  const timerProgressToCountdown = React.useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / SECS_IN_MIN)
    const closestDiscreteStage = getFibonacciDiscrete(minutes)

    // TODO: extract functionality to an external function
    for (const num of STAGES) {
      if (closestDiscreteStage === num) {
        const nextStageIndex = STAGES.indexOf(closestDiscreteStage) + 1
        const nextStage =
          minutes < closestDiscreteStage
            ? closestDiscreteStage
            : STAGES[nextStageIndex]
        const secondsToNextStage = nextStage * SECS_IN_MIN - seconds

        const minutesRemain = Math.floor(secondsToNextStage / SECS_IN_MIN)
        const secondsRemain =
          (nextStage - minutesRemain) * SECS_IN_MIN - seconds

        setSecondsRemain(secondsRemain)
        setMinutesRemain(minutesRemain)
      }
    }
  }, [])

  React.useEffect(() => {
    if (seconds) {
      timerProgressToCountdown(seconds)
    }
  }, [seconds, timerProgressToCountdown])

  React.useEffect(() => {
    if (seconds === 0) {
      setSecondsRemain(0)
      setMinutesRemain(0)
    }

    setTimeRemain(remainTimeToDigitClock(secondsRemain, minutesRemain))
  }, [minutesRemain, seconds, secondsRemain])

  return (
    <StyledTooltip
      wrapContent
      positionSide="bottom"
      content={"Time left until the next stage"}
    >
      <StyledCountdown>{timeRemain}</StyledCountdown>
      {status === "loaded" && <CheckMark />}
    </StyledTooltip>
  )
}
