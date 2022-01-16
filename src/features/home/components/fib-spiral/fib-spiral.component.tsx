import React, { useMemo } from "react"
import {
  getColorFromCSSVar,
  getColorStyleSheetVarName,
} from "shared/components/progress/utils"
import { getFloorFibonacciDiscrete } from "shared/utils/getNextFibonacciStage"
import {
  MAX_SPIRAL_VALUE,
  PATH_TO_DRAWN,
  START_SPIRAL_OFFSET,
} from "./fib-spiral.constants"
import { Wrapper } from "./fib.spiral.styles"

const getTimerProgress = (seconds: number) => {
  if (seconds === 0) return 0
  if (seconds < 60) return (MAX_SPIRAL_VALUE / 60) * seconds
  if (seconds < 120) return (MAX_SPIRAL_VALUE / 60) * (seconds - 60)
  if (seconds < 180) return (MAX_SPIRAL_VALUE / 60) * (seconds - 120)
  if (seconds < 300) return (MAX_SPIRAL_VALUE / 120) * (seconds - 180)
  if (seconds < 480) return (MAX_SPIRAL_VALUE / 180) * (seconds - 300)
  if (seconds < 780) return (MAX_SPIRAL_VALUE / 300) * (seconds - 480)
  if (seconds < 1260) return (MAX_SPIRAL_VALUE / 480) * (seconds - 780)
  return 1 * seconds
}

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
    <Wrapper progress={START_SPIRAL_OFFSET + progress} color={fibColor}>
      <svg
        className="progress-spiral"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 760 769"
      >
        <path
          stroke="var(--c-spiral)"
          className="progress-trial"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1rem"
          fillOpacity="0"
          d={PATH_TO_DRAWN}
        />

        <path
          strokeDasharray={MAX_SPIRAL_VALUE}
          strokeDashoffset={START_SPIRAL_OFFSET}
          className="progress-path"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5rem"
          fillOpacity="0"
          d={PATH_TO_DRAWN}
        />
      </svg>
    </Wrapper>
  )
}
