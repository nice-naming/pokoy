import React, { useMemo } from "react"
import {
  getColorFromCSSVar,
  getColorStyleSheetVarName,
} from "features/home/utils"
import { getFloorFibonacciDiscrete } from "shared/utils/getNextFibonacciStage"
import { PATH_TO_DRAWN, START_SPIRAL_OFFSET } from "./fib-spiral.constants"
import { Wrapper } from "./fib.spiral.styles"
import { getTimerProgress } from "./get-timer-progress"

interface Props {
  seconds: number
}

export const FibSpiral: React.FC<Props> = ({ seconds }) => {
  const progress = getTimerProgress(seconds)
  const minutes = Math.floor(seconds / 60)
  const fibColor = useMemo(() => {
    const fibStage = getFloorFibonacciDiscrete(minutes)
    const colorCSSVarName = getColorStyleSheetVarName(fibStage)
    return getColorFromCSSVar(colorCSSVarName)
  }, [minutes])

  return (
    <Wrapper
      className="progress-spiral"
      offset={START_SPIRAL_OFFSET + progress}
      color={fibColor}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 760 769"
      >
        <path
          stroke="var(--c-spiral)"
          className="spiral-trial"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1rem"
          fillOpacity="0"
          d={PATH_TO_DRAWN}
        />

        <path
          strokeDashoffset={START_SPIRAL_OFFSET}
          className="spiral-path"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          fillOpacity="0"
          d={PATH_TO_DRAWN}
        />
      </svg>
    </Wrapper>
  )
}
