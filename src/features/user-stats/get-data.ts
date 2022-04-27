import { firestore } from "features/home/firebase-init"
import { User } from "firebase/auth"
import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore"
import { UserSerie } from "react-charts"
import {
  INITIAL_MEDITATION_DURATION,
  MILLIS_IN_DAY,
  MINS_IN_HOUR,
  SECS_IN_DAY,
} from "shared/constants"
import { DayData, PokoyChartData, UserStatsData } from "shared/types"
import { roundToFirstDecimalPlace } from "shared/utils/roundToSecondDecimalPlace"
import { SECONDARY_AXIS_LABEL, TERTIARY_AXIS_LABEL } from "./constants"
import { getFullRange } from "./get-full-range"

export const ADDITIONAL_DATA_LENGTH = 14

// eslint-disable-next-line max-statements
export const getForesightChartData = async (
  daysData: DayData[],
  user: User
) => {
  const lastData = daysData[daysData.length - 1]
  const lastDateTimestampSeconds = lastData.timestamp.seconds

  const stats = await fetchStats(user)
  const averageMeditationDuration = getAverageMeditationPerDay(stats)
  const daysToNextMilestone = ADDITIONAL_DATA_LENGTH

  const additionalDaysData: DayData[] = new Array(daysToNextMilestone)
    .fill(null)
    .map((_, i) => ({
      timestamp: new Timestamp(
        lastDateTimestampSeconds + (i + 1) * SECS_IN_DAY,
        0
      ),
      totalDuration: averageMeditationDuration,
      count: 0,
      meditations: [],
      userId: user.uid,
    }))

  return additionalDaysData
}

// TODO: refactor this module
export const fetchAndSetChartData = async (
  setDataToComponentState: (data: UserSerie<PokoyChartData>[]) => void,
  user: User
): Promise<void> => {
  const daysWithMeditations = await fetchDays(user)
  const daysDataFullRange = getFullRange(daysWithMeditations)

  const additionalDaysData = await getForesightChartData(
    daysDataFullRange,
    user
  )
  const daysDataWithForesight = daysDataFullRange.concat(additionalDaysData)
  const chartData = transformDayDataToChartData(daysDataWithForesight)

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

async function fetchStats(user: User): Promise<UserStatsData> {
  const statsColRef = collection(firestore, "stats")
  const statsQuery = query(statsColRef, where("userId", "==", user.uid))
  const daysColSnapshot = await getDocs(statsQuery)
  const statsData = daysColSnapshot?.docs[0]?.data() as UserStatsData

  return statsData
}

function transformDayDataToChartData(
  daysDataFullRange: DayData[]
): UserSerie<PokoyChartData>[] {
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
