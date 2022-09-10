import { FIB_NUM_TO_COLOR_VAR_MAP } from "shared/constants"

type ColorHex = string

export const getColorStyleSheetVarName = (fibNum: number): ColorHex => {
  return FIB_NUM_TO_COLOR_VAR_MAP[fibNum]
}

export const getColorFromCSSVar = (colorCSSVarName: string): ColorHex => {
  return getComputedStyle(document?.documentElement)?.getPropertyValue(
    colorCSSVarName
  )
}
