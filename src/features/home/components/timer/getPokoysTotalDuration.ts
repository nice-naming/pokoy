import { firestore } from "features/home/firebase-init"
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  setDoc,
  where
} from "firebase/firestore"
import { DayData } from "shared/types"

// eslint-disable-next-line max-statements
export const getStatsForUser = async () => {
  const userId = "" // NOTE: for manual pasting
  const daysQ = query(
    collection(firestore, "days"),
    where("userId", "==", userId),
    orderBy("timestamp", "asc")
  )

  const querySnapshot = await getDocs(daysQ)
  const daysDocs = querySnapshot.docs
  const total = getTotalDurationFromDays(daysDocs)

  const count = daysDocs.length
  const firstMeditationDate =
    (daysDocs?.[0]?.data() as DayData)?.timestamp || null

  const statsQ = query(
    collection(firestore, "stats"),
    where("userId", "==", userId),
    limit(1)
  )
  const statsQuerySnapshot = await getDocs(statsQ)

  const userStatsColRef = collection(firestore, "stats")
  const userStatsRef = statsQuerySnapshot.empty
    ? doc(userStatsColRef)
    : statsQuerySnapshot.docs[0].ref
  const newUserStatsData = {
    count,
    userId,
    firstMeditationDate,
    totalDuration: total
  }

  setDoc(userStatsRef, newUserStatsData)
}
function getTotalDurationFromDays(
  daysDocs: QueryDocumentSnapshot<DocumentData>[]
) {
  return daysDocs.reduce((acc, doc) => {
    const dayTotal = (doc.data() as DayData).meditations.reduce(
      (acc, med) => acc + med.duration,
      0
    )
    return acc + dayTotal
  }, 0)
}
