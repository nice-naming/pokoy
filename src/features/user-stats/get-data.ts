import { firestore } from "features/home/firebase-init"
import { User } from "firebase/auth"
import {
  collection,
  CollectionReference,
  getDocs,
  orderBy,
  query,
  where
} from "firebase/firestore"
import {
  DayData,
  ServerDayData,
  ServerUserStatsData,
  MockDayData,
  UserStatsData
} from "shared/types"
import {
  getAverageMeditationPerDay,
  getPseudoDayData
} from "./user-stats.utils"

// TODO: refactor this method
// eslint-disable-next-line max-statements
export function getForesightDaysData(
  daysData: DayData[],
  stats: UserStatsData,
  additionalDataLength: number
) {
  const lastData = daysData[daysData.length - 1]

  const averageMeditationDuration = getAverageMeditationPerDay(
    stats.firstMeditationDate,
    stats.totalDuration
  )

  const additionalDaysData: MockDayData[] = new Array(additionalDataLength)
    .fill(null)
    .map((_, i) =>
      getPseudoDayData(i, lastData.timestamp, averageMeditationDuration)
    )

  return additionalDaysData
}

// eslint-disable-next-line max-statements
export async function fetchStats(user: User): Promise<UserStatsData | null> {
  const statsColRef = collection(
    firestore,
    "stats"
  ) as CollectionReference<ServerUserStatsData>

  const statsQuery = query(statsColRef, where("userId", "==", user.uid))
  const daysColSnapshot = await getDocs(statsQuery)
  const statsData = daysColSnapshot?.docs[0]?.data()

  if (!statsData) {
    return null
  }

  const userStatsData: UserStatsData = {
    ...statsData,
    firstMeditationDate: statsData?.firstMeditationDate?.toMillis() || 0
  }

  return userStatsData
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
