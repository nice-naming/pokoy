import React, { useMemo } from "react"
import {
  getColorFromCSSVar,
  getColorStyleSheetVarName,
} from "features/home/utils"
import {
  PATH_TO_DRAWN,
  START_SPIRAL_OFFSET,
  MAX_SPIRAL_VALUE,
} from "./fib-spiral.constants"
import { Wrapper } from "./fib-spiral.styles"
import { getTimerProgress } from "./get-timer-progress"
import { getFloorFibonacciDiscrete } from "shared/utils/getFloorFibonacciDiscrete"

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
  const isEmpty = progress > MAX_SPIRAL_VALUE * 0.99 || progress < 1
  const spiralProgressClassName = `spiral-path ${
    isEmpty && "spiral-path-empty"
  }`

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
          className={spiralProgressClassName}
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
