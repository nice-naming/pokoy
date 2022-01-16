import { fibNumToStyleSheetVarMap } from "shared/constants"

type ColorHex = string

export const getColorStyleSheetVarName = (fibNum: number): ColorHex => {
  return fibNumToStyleSheetVarMap[fibNum]
}

export const getColorFromCSSVar = (colorCSSVarName: string): ColorHex => {
  return getComputedStyle(document?.documentElement)?.getPropertyValue(
    colorCSSVarName
  )
}
