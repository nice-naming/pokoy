import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  DocumentReference,
  Firestore,
  getDoc,
  getDocs,
  limit,
  query,
  QuerySnapshot,
  setDoc,
  Timestamp,
  where
} from "firebase/firestore"
import { SECS_IN_MIN } from "shared/constants"
import { PokoySession, ServerDayData } from "shared/types"
import { roundToHundredth } from "shared/utils/roundToSecondDecimalPlace"

export const createSessionData = (
  userId: string,
  seconds: number
): PokoySession => {
  const timestamp = new Date().toISOString()
  const duration = roundToHundredth(seconds / SECS_IN_MIN)

  return {
    userId,
    timestamp,
    duration
  }
}

/* eslint-disable-next-line max-statements */
export const sendMeditationToServer = async (
  firestoreDB: Firestore,
  pokoyData: PokoySession
) => {
  const userId = pokoyData.userId
  const daysColRef = collection(firestoreDB, "days")
  const dayTimestamp = Timestamp.fromMillis(
    // WARN: possible bug with forgetting timezone
    new Date(pokoyData.timestamp).setHours(0, 0, 0, 0)
  )

  const daysQuery = query(
    daysColRef,
    where("userId", "==", userId),
    where("timestamp", "==", dayTimestamp)
  )

  try {
    const daysQuerySnapshot = await getDocs(daysQuery)

    if (daysQuerySnapshot.empty) {
      return await createNewDay(
        daysColRef,
        dayTimestamp,
        pokoyData,
        userId,
        firestoreDB
      )
    } else {
      return await updateExistingDay(daysQuerySnapshot, pokoyData)
    }
  } catch (e) {
    console.error("⛔️", e)
  }
}

// TODO: refactor this function
/* eslint-disable-next-line max-statements */
const createNewDay = async (
  daysColRef: CollectionReference<DocumentData>,
  dayTimestamp: Timestamp,
  pokoyData: PokoySession,
  userId: string,
  firestoreDB: Firestore
  // eslint-disable-next-line max-params
) => {
  const newDayRef = doc(daysColRef)

  const statsQuery = query(
    collection(firestoreDB, "stats"),
    where("userId", "==", userId),
    limit(1)
  )
  const userStatsQuerySnapshot = await getDocs(statsQuery)

  if (userStatsQuerySnapshot.empty) {
    console.error("User stats not found")
    return
  }
  const userStatsRef = userStatsQuerySnapshot.docs[0].ref

  const newDayData: ServerDayData = {
    totalDuration: roundToHundredth(pokoyData.duration),
    meditations: [pokoyData],
    timestamp: dayTimestamp,
    statsRef: userStatsRef,
    userId,
    count: 1
  }

  await setDay(newDayRef, newDayData, pokoyData)
  return newDayData
}

/* eslint-disable-next-line max-statements */
const updateExistingDay = async (
  daysQuerySnapshot: QuerySnapshot<DocumentData>,
  pokoyData: PokoySession
) => {
  // TODO: replace hardcode by dynamic code
  const dayDocRef = daysQuerySnapshot.docs[0].ref
  const daySnapshot = await getDoc(dayDocRef)
  const dayData = daySnapshot.data() as ServerDayData

  const totalDuration = dayData?.totalDuration ?? 0
  const meditations = dayData?.meditations ?? []

  const newDayData: ServerDayData = {
    ...dayData,
    count: dayData?.count + 1,
    totalDuration: roundToHundredth(totalDuration + pokoyData.duration),
    meditations: [...meditations, pokoyData]
  }

  await setDay(dayDocRef, newDayData, pokoyData)
  return newDayData
}

const setDay = async (
  dayRef: DocumentReference<DocumentData>,
  newDayData: ServerDayData,
  pokoyData: PokoySession
) => {
  try {
    await setDoc(dayRef, newDayData)
  } catch (e) {
    console.error("⛔️", e)
  }
}
