import { firestore } from "features/home/firebase-init"
import { User } from "firebase/auth"
import { collection, getDocs, orderBy, query, where } from "firebase/firestore"
import { UserSerie } from "react-charts"
import { DayData, PokoyChartData, UserStatsData } from "shared/types"
import {
  MINS_IN_HOUR,
  SECONDARY_AXIS_LABEL,
  SECS_IN_DAY,
  TERTIARY_AXIS_LABEL,
} from "./constants"
import { getFullRange } from "./get-full-range"

const INITIAL_MEDITATION_DURATION = 0

// TODO: refactor this module
export const fetchAndsetChartData = async (
  setDataToComponentState: (data: UserSerie<PokoyChartData>[]) => void,
  user: User
): Promise<void> => {
  const daysWithMeditations = await fetchDays(user)
  const dayDataFullRange = getFullRange(daysWithMeditations)
  const chartData = transformDayDataToChartData(dayDataFullRange)

  return setDataToComponentState(chartData)
}

export const getStats = async (
  setDataToComponentState: (data: UserStatsData) => void,
  user: User
): Promise<void> => {
  const statsData = await fetchStats(user)

  if (!statsData) {
    console.error("there are no user statistics yet")
    return
  }

  setDataToComponentState(statsData)
}

export const getTotalInHours = (minutes: number): number => {
  return Math.floor(minutes / MINS_IN_HOUR)
}

export const getAverage = (statsData: UserStatsData) => {
  if (!statsData || !statsData.firstMeditationDate) {
    return null
  }

  const { firstMeditationDate } = statsData
  const statsMillisecondsDiff =
    Date.now() - firstMeditationDate.toDate().getTime()
  const statsRangeInDays = statsMillisecondsDiff / SECS_IN_DAY

  const average = roundToSecondDecimalPlace(
    statsData.totalDuration / statsRangeInDays
  )

  return average
}

async function fetchStats(user: User): Promise<UserStatsData> {
  const statsColRef = collection(firestore, "stats")
  const statsQuery = query(statsColRef, where("userId", "==", user.uid))
  const daysColSnapshot = await getDocs(statsQuery)
  const statsData = daysColSnapshot?.docs[0]?.data() as UserStatsData

  return statsData
}

function transformDayDataToChartData(
  dayDataFullRange: DayData[]
): UserSerie<PokoyChartData>[] {
  const daysWithMeditationsAsAxis: PokoyChartData[] = dayDataFullRange.map(
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
      const total = roundToSecondDecimalPlace(d.secondary / 60 + prevTotal)
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

async function fetchDays(user: User): Promise<DayData[]> {
  const daysColRef = collection(firestore, "days")
  const daysQuery = query(
    daysColRef,
    where("userId", "==", user.uid),
    orderBy("timestamp", "desc")
  )
  const daysColSnapshot = await getDocs(daysQuery)
  const daysWithMeditations = daysColSnapshot.docs.map(
    (snap) => snap.data() as DayData
  )
  return daysWithMeditations
}

function roundToSecondDecimalPlace(average: number): number {
  return Math.round(average * 10) / 10
}
