import { UserSerie } from "react-charts"
import { MILLIS_IN_DAY, MINS_IN_HOUR } from "shared/constants"
import {
  roundToTenth,
  roundToHundredth
} from "shared/utils/roundToSecondDecimalPlace"
import {
  DayData,
  Milliseconds,
  Minutes,
  MockDayData,
  PokoyChartData,
  UserStatsData
} from "shared/types"
import {
  INIT_TOTAL_DURATION,
  MAX_DAYS_DATA_LENGTH,
  SECONDARY_AXIS_LABEL,
  TERTIARY_AXIS_LABEL,
  THIRD_PART
} from "./user-stats.constants"
import { getForesightDaysData } from "./get-data"

export const getTotalInHours = (minutes: number): number => {
  return Math.floor(minutes / MINS_IN_HOUR)
}

// eslint-disable-next-line max-statements
export const getAverageMeditationPerDay = (
  firstMeditationDate: Milliseconds,
  totalDuration: Minutes
) => {
  if (!firstMeditationDate) {
    throw new Error("there are no user statistics yet")
  }

  const statsMillisecondsDiff = Date.now() - firstMeditationDate
  const statsRangeInDays = Math.floor(statsMillisecondsDiff / MILLIS_IN_DAY)
  const average = roundToTenth(totalDuration / statsRangeInDays)

  return average
}

// eslint-disable-next-line max-statements
const transformDayDataToChartData = (
  daysData: MockDayData[]
): UserSerie<PokoyChartData>[] => {
  const daysWithMeditationsAxisData: PokoyChartData[] = daysData.map((d) => ({
    primary: new Date(d.timestamp),
    secondary: d.totalDuration
  }))
  const totalDurationsAxisData: PokoyChartData[] =
    daysWithMeditationsAxisData.reduce(
      (acc, el, i) => getTotalDurationsAsAxisData(acc, el, i),
      [] as PokoyChartData[]
    )

  const secondaryAxisData: UserSerie<PokoyChartData> = {
    label: SECONDARY_AXIS_LABEL,
    data: daysWithMeditationsAxisData,
    id: "2",
    secondaryAxisId: "2"
  }
  const tertiaryAxisData: UserSerie<PokoyChartData> = {
    label: TERTIARY_AXIS_LABEL,
    data: totalDurationsAxisData,
    id: "1"
  }

  const chartData = [secondaryAxisData, tertiaryAxisData]
  return chartData
}

export function getTotalDurationsAsAxisData(
  acc: PokoyChartData[],
  dayData: PokoyChartData,
  index: number
) {
  const prevTotal = acc[index - 1]?.secondary || INIT_TOTAL_DURATION
  const newTotal = dayData.secondary / 60 + prevTotal
  const newData = {
    primary: dayData.primary,
    secondary: roundToHundredth(newTotal)
  }

  return [...acc, newData]
}

// TODO: add generic type for parameters
const cutDataRange = (daysData: (MockDayData | DayData | PokoyChartData)[]) => {
  const dataLength = daysData.length

  if (dataLength <= MAX_DAYS_DATA_LENGTH) {
    return daysData
  }

  const maxLengthDiff = dataLength - MAX_DAYS_DATA_LENGTH
  return daysData.slice(maxLengthDiff, dataLength)
}

export const getPseudoDayData = (
  index: number,
  lastTimestampMillis: number,
  averageMeditationDuration: number
): MockDayData => ({
  timestamp: lastTimestampMillis + (index + 1) * MILLIS_IN_DAY,
  totalDuration: averageMeditationDuration
})

function getDataWithForesight(daysData: DayData[], statsData: UserStatsData) {
  const additionalDataLength = Math.round(daysData.length * THIRD_PART)
  const additionalDaysData = getForesightDaysData(
    daysData,
    statsData,
    additionalDataLength
  )
  const daysDataWithForesight = [...daysData, ...additionalDaysData]
  return daysDataWithForesight
}

export const getUserChartData = (
  userDaysData: DayData[],
  userStatistics: UserStatsData
) => {
  const cuttedChartData = cutDataRange(userDaysData) as DayData[]
  const chartDataWithForesight = getDataWithForesight(
    cuttedChartData,
    userStatistics
  )
  const chartData = transformDayDataToChartData(chartDataWithForesight)
  return chartData
}
