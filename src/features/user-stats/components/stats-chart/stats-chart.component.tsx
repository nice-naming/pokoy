import React, { useCallback, useMemo } from "react"
import { Chart, UserSerie, Datum, DatumStyles } from "react-charts"
import { PokoyChartData } from "shared/types"
import { Wrapper } from "./stats-chart.styles"
import {
  CHART_COLORS,
  CHART_TOOLTIP_CONFIG,
  PRIMARY_AXIS_CONFIG,
  SECONDARY_AXES_CONFIG,
  SECONDARY_CURSOR_CONFIG,
} from "./constants"
import { THIRD_PART } from "features/user-stats/constants"

interface Props {
  pokoyData: UserSerie<PokoyChartData>[]
}

export const StatsChart: React.FC<Props> = ({ pokoyData }) => {
  const getDatumStyle = useCallback(
    (datum: Datum<PokoyChartData>): DatumStyles => {
      const dataLength = pokoyData[0].data.length
      const startPositionOfForesight = Math.round(dataLength / (1 + THIRD_PART))

      return datum.index + 1 > startPositionOfForesight ? { opacity: 0.5 } : {}
    },
    [pokoyData]
  )

  const chartOptions = useMemo(
    () => ({
      data: pokoyData,
      getDatumStyle,
      //
      dark: true,
      primaryCursor: true,
      defaultColors: CHART_COLORS,
      tooltip: CHART_TOOLTIP_CONFIG,
      primaryAxis: PRIMARY_AXIS_CONFIG,
      secondaryAxes: SECONDARY_AXES_CONFIG,
      secondaryCursor: SECONDARY_CURSOR_CONFIG,
    }),
    [getDatumStyle, pokoyData]
  )

  return (
    <Wrapper>
      <Chart options={chartOptions} />
    </Wrapper>
  )
}
