import React, { useMemo } from "react"
import { Chart, AxisOptions, UserSerie } from "react-charts"
import { CSSColorVariables } from "shared/constants"
import { PokoyChartData } from "shared/types"
import { getColorFromCSSVar } from "features/home/utils"
import { Wrapper } from "./stats-chart.styles"

// TODO: extract to types and constants
const totalChartConfig: AxisOptions<PokoyChartData> = {
  // TODO: add dynamic max value
  max: 3,
  getValue: (datum) => datum.secondary,
  elementType: "area",
  formatters: {
    tooltip: (value: number) => `${value} hours`,
  },
}

const dayMeditationChartConfig: AxisOptions<PokoyChartData> = {
  min: 0,
  elementType: "bar",
  getValue: (datum: PokoyChartData) => datum.secondary,
  id: "2",
  formatters: {
    tooltip: (value: number) => `${value} minutes`,
  },
}

interface Props {
  pokoyData: UserSerie<PokoyChartData>[]
}

export const StatsChart: React.FC<Props> = ({ pokoyData }) => {
  const primaryAxis = useMemo<AxisOptions<PokoyChartData>>(
    () => ({
      getValue: (datum: PokoyChartData) => {
        datum.primary.setUTCHours(0)
        datum.primary.setUTCMinutes(0)
        datum.primary.setUTCSeconds(0)
        datum.primary.setUTCMilliseconds(0)
        return datum.primary
      },
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

  return (
    <Wrapper>
      <Chart
        options={{
          data: pokoyData,
          defaultColors,
          primaryAxis,
          secondaryAxes,
          dark: true,
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
