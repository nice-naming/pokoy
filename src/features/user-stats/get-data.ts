import { firestore } from "features/home/firebase-init"
import { User } from "firebase/auth"
import { collection, getDocs, orderBy, query, where } from "firebase/firestore"
import { UserSerie } from "react-charts"
import {
  DayData,
  PokoyChartData,
  ServerDayData,
  ServerUserStatsData,
  MockDayData,
  UserStatsData,
} from "shared/types"
import { THIRD_PART } from "./constants"
import { getFullRange } from "./get-full-range"
import {
  getAverageMeditationPerDay,
  getPseudoDayData,
  sliceDaysDataRange,
  transformDayDataToChartData,
} from "./utils"

// eslint-disable-next-line max-statements
export const fetchToLocalStateChartData = async (
  setDataToComponentState: (data: UserSerie<PokoyChartData>[]) => void,
  user: User
): Promise<void> => {
  const daysWithMeditations = await fetchDays(user)
  const shallowDaysWithMeditations = daysWithMeditations.map((d) => ({
    ...d,
    timestamp: d.timestamp.toMillis(),
    statsRef: d.statsRef?.path,
  }))

  const daysDataFullRange = getFullRange(shallowDaysWithMeditations)

  const slicedRange = sliceDaysDataRange(daysDataFullRange)
  const additionalDataLength = Math.round(slicedRange.length * THIRD_PART)
  const additionalDaysData = await getForesightChartData(
    slicedRange,
    user,
    additionalDataLength
  )
  const daysDataWithForesight = [...slicedRange, ...additionalDaysData]
  const chartData = transformDayDataToChartData(daysDataWithForesight)

  return setDataToComponentState(chartData)
}

// export const fetchChartData = async (
//   user: User,
// ): Promise<UserSerie<PokoyChartData>[]> => {

// }

// TODO: refactor this method
// eslint-disable-next-line max-statements
export async function getForesightChartData(
  daysData: DayData[],
  user: User,
  additionalDataLength: number
) {
  const lastData = daysData[daysData.length - 1]

  const stats = await fetchStats(user)
  const averageMeditationDuration = getAverageMeditationPerDay(stats)
  const daysToNextMilestone = additionalDataLength

  const additionalDaysData: MockDayData[] = new Array(daysToNextMilestone)
    .fill(null)
    .map((_, i) =>
      getPseudoDayData(i, lastData.timestamp, averageMeditationDuration)
    )

  return additionalDaysData
}

export const fetchToLocalStateStats = async (
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

export async function fetchStats(user: User): Promise<UserStatsData> {
  const statsColRef = collection(firestore, "stats")
  const statsQuery = query(statsColRef, where("userId", "==", user.uid))
  const daysColSnapshot = await getDocs(statsQuery)
  const statsData = daysColSnapshot?.docs[0]?.data() as ServerUserStatsData

  const shallowStatsData: UserStatsData = {
    ...statsData,
    // TODO: remove nullable value from type
    firstMeditationDate: statsData.firstMeditationDate?.toMillis() || null,
  }

  return shallowStatsData
}

export async function fetchDays(user: User): Promise<ServerDayData[]> {
  const daysColRef = collection(firestore, "days")
  const daysQuery = query(
    daysColRef,
    where("userId", "==", user.uid),
    orderBy("timestamp", "desc")
  )
  const daysColSnapshot = await getDocs(daysQuery)
  const daysWithMeditations = daysColSnapshot.docs.map(
    (snap) => snap.data() as ServerDayData
  )
  return daysWithMeditations
}
