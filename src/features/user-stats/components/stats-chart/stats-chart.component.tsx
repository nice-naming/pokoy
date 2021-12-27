import { getColorFromCSSVar } from "shared/components/progress/utils"
import React, { useMemo } from "react"
import { Chart, AxisOptions, UserSerie } from "react-charts"
import { CSSColorVariables } from "shared/constants"
import { PokoyChartData } from "shared/types"
import { Wrapper } from "./stats-chart.styles"

// TODO: extract to types and constants
const totalChartConfig: AxisOptions<PokoyChartData> = {
  // TODO: add dynamic max value
  max: 34,
  getValue: (datum) => datum.secondary,
  elementType: "area",
  // id: "1"
}

const dayMeditationChartConfig: AxisOptions<PokoyChartData> = {
  min: 0,
  max: 34,
  elementType: "bar",
  getValue: (datum: PokoyChartData) => datum.secondary,
  id: "2",
}

interface Props {
  pokoyData: UserSerie<PokoyChartData>[]
}

export const StatsChart: React.FC<Props> = ({ pokoyData }) => {
  const primaryAxis = useMemo<AxisOptions<PokoyChartData>>(
    () => ({
      getValue: (datum: PokoyChartData) => datum.primary,
    }),
    []
  )

  const secondaryAxes = useMemo<AxisOptions<PokoyChartData>[]>(
    () => [totalChartConfig, dayMeditationChartConfig],
    []
  )

  const defaultColors = useMemo<string[]>(() => {
    const { GREEN, BLUE } = CSSColorVariables
    const extraGrayColor = getColorFromCSSVar(BLUE)
    const greenColor = getColorFromCSSVar(GREEN)
    const chartColors = [greenColor, extraGrayColor]

    return chartColors
  }, [])

  const isDark: boolean =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches

  return (
    <Wrapper>
      <Chart
        options={{
          data: pokoyData,
          defaultColors,
          primaryAxis,
          secondaryAxes,
          dark: isDark,
          tooltip: {
            groupingMode: "single",
            show: true,
          },
          primaryCursor: true,
          secondaryCursor: {
            show: true,
            showLine: true,
            showLabel: true,
          },
        }}
      />
    </Wrapper>
  )
}
