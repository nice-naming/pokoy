import { Timestamp } from "firebase/firestore"
import { UserSerie } from "react-charts"
import {
  INITIAL_MEDITATION_DURATION,
  MILLIS_IN_DAY,
  MINS_IN_HOUR,
  SECS_IN_DAY,
} from "shared/constants"
import { DayData, PokoyChartData, UserStatsData } from "shared/types"
import { roundToFirstDecimalPlace } from "shared/utils/roundToSecondDecimalPlace"
import {
  MAX_DAYS_DATA_LENGTH,
  SECONDARY_AXIS_LABEL,
  TERTIARY_AXIS_LABEL,
} from "./constants"

export const getTotalInHours = (minutes: number): number => {
  return Math.floor(minutes / MINS_IN_HOUR)
}

// eslint-disable-next-line max-statements
export const getAverageMeditationPerDay = (statsData: UserStatsData) => {
  if (!statsData || !statsData.firstMeditationDate) {
    throw new Error("there are no user statistics yet")
  }

  const { firstMeditationDate } = statsData
  const statsMillisecondsDiff =
    Date.now() - firstMeditationDate.toDate().getTime()
  const statsRangeInDays = statsMillisecondsDiff / MILLIS_IN_DAY

  const average = roundToFirstDecimalPlace(
    statsData.totalDuration / statsRangeInDays
  )

  return average
}

export const transformDayDataToChartData = (
  daysDataFullRange: DayData[]
): UserSerie<PokoyChartData>[] => {
  const daysWithMeditationsAsAxis: PokoyChartData[] = daysDataFullRange.map(
    (d) => ({
      primary: new Date(d.timestamp.toDate().toDateString()),
      secondary: d.totalDuration,
    })
  )
  const totalDurationsAxisData: PokoyChartData[] = getTotalDurationsAsAxisData(
    daysWithMeditationsAsAxis
  )

  const secondaryAxisData = {
    label: SECONDARY_AXIS_LABEL,
    data: daysWithMeditationsAsAxis,
    id: "2",
    secondaryAxisId: "2",
  }
  const tertiaryAxisData = {
    label: TERTIARY_AXIS_LABEL,
    data: totalDurationsAxisData,
    id: "1",
    // secondaryAxisId: "1"
  }

  const chartData = [secondaryAxisData, tertiaryAxisData]
  return chartData
}

function getTotalDurationsAsAxisData(
  daysWithMeditationsAsAxis: PokoyChartData[]
): PokoyChartData[] {
  const totalDurationAsAxisData = daysWithMeditationsAsAxis.reduce(
    (acc, d, i) => {
      const prevTotal = acc[i - 1]?.secondary || INITIAL_MEDITATION_DURATION
      const total = roundToFirstDecimalPlace(d.secondary / 60 + prevTotal)
      return [
        ...acc,
        {
          primary: d.primary,
          secondary: total,
        },
      ]
    },
    [] as PokoyChartData[]
  )

  return totalDurationAsAxisData
}

export const sliceDaysDataRange = (daysData: DayData[]) => {
  const dataLength = daysData.length

  if (dataLength <= MAX_DAYS_DATA_LENGTH) {
    return daysData
  }

  const maxLengthDiff = dataLength - MAX_DAYS_DATA_LENGTH
  return daysData.slice(maxLengthDiff, dataLength)
}

export const getPseudoDayData = (
  index: number,
  lastTimestampSeconds: number,
  averageMeditationDuration: number
) => ({
  timestamp: new Timestamp(lastTimestampSeconds + (index + 1) * SECS_IN_DAY, 0),
  totalDuration: averageMeditationDuration,
  count: 0,
  meditations: [],
  userId: "",
})
