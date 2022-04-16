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
import { StyledSpiralPath, StyledSvg } from "./fib-spiral.styles"
import { getTimerProgress } from "./get-timer-progress"
import { getFloorFibonacciDiscrete } from "shared/utils/getFloorFibonacciDiscrete"

// TODO: move to constants
const ALMOST_DONE_PERCENT = 0.99
const ALMOST_DONE_VALUE = MAX_SPIRAL_VALUE * ALMOST_DONE_PERCENT

interface Props {
  seconds: number
}

export const FibSpiral: React.FC<Props> = ({ seconds }) => {
  const progress = getTimerProgress(seconds)
  const minutes = Math.floor(seconds / 60)
  const isEmpty = progress > ALMOST_DONE_VALUE || progress < 1

  const fibColor = useMemo(() => {
    const fibStage = getFloorFibonacciDiscrete(minutes)
    const colorCSSVarName = getColorStyleSheetVarName(fibStage)
    return getColorFromCSSVar(colorCSSVarName)
  }, [minutes])

  return (
    <StyledSvg
      progress={progress}
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

      <StyledSpiralPath
        color={fibColor}
        offset={START_SPIRAL_OFFSET + progress}
        isEmpty={isEmpty}
        strokeDashoffset={START_SPIRAL_OFFSET}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        fillOpacity="0"
        d={PATH_TO_DRAWN}
      />
    </StyledSvg>
  )
}
