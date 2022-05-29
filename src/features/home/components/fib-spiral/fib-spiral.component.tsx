import React, { useMemo } from "react"
import {
  getColorFromCSSVar,
  getColorStyleSheetVarName,
} from "features/home/utils"
import {
  PATH_TO_DRAWN,
  START_SPIRAL_OFFSET,
  MAX_SPIRAL_VALUE,
  INIT_STROKE_DASHARRAY,
} from "./fib-spiral.constants"
import { getTimerProgress } from "./get-timer-progress"
import { getFloorFibonacciDiscrete } from "shared/utils/getFloorFibonacciDiscrete"
import styles from "./fib-spiral.module.css"

// TODO: move to constants
const ALMOST_DONE_PERCENT = 0.995
const ALMOST_DONE_VALUE = MAX_SPIRAL_VALUE * ALMOST_DONE_PERCENT

interface Props {
  seconds: number
  authLoading: boolean
}

export const FibSpiral: React.FC<Props> = ({ seconds, authLoading }) => {
  const progress = getTimerProgress(seconds)
  const minutes = Math.floor(seconds / 60)
  const isEmpty = progress > ALMOST_DONE_VALUE || progress < 1

  const fibColor = useMemo(() => {
    const fibStage = getFloorFibonacciDiscrete(minutes)
    const colorCSSVarName = getColorStyleSheetVarName(fibStage)
    return getColorFromCSSVar(colorCSSVarName)
  }, [minutes])

  const isStarted = progress > START_SPIRAL_OFFSET
  const isStartedClassName = isStarted ? styles.spiralPathStarted : null
  const isEmptyClassName = isEmpty ? styles.spiralPathEmpty : null
  const spiralForegroundClassNames = `${styles.spiralPath} ${isStartedClassName} ${isEmptyClassName}`

  const isLoadingClassName = authLoading ? styles.spiralBackgroundLoading : null
  const spiralBackgroundClassNames = `${styles.spiralBackground} ${isLoadingClassName} spiral-trial`

  const isSpinningClassName = isStarted ? styles.svgSpinning : null
  const fibSpiralClassNames = `${styles.svg} ${isSpinningClassName}`

  return (
    <svg
      className={fibSpiralClassNames}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 760 769"
    >
      <path
        className={spiralBackgroundClassNames}
        d={PATH_TO_DRAWN}
        strokeLinecap="round"
        strokeLinejoin="round"
        fillOpacity="0"
      />

      <path
        className={spiralForegroundClassNames}
        stroke={fibColor}
        strokeDasharray={INIT_STROKE_DASHARRAY}
        strokeDashoffset={START_SPIRAL_OFFSET + progress}
        d={PATH_TO_DRAWN}
        strokeLinecap="round"
        strokeLinejoin="round"
        fillOpacity="0"
      />
    </svg>
  )
}
