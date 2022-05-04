// TODO: solve linter issue
/* eslint-disable max-lines */
import { User } from "@firebase/auth"
import { formatISO } from "date-fns"
import { firestore } from "features/home/firebase-init"
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
  where,
} from "firebase/firestore"
import {
  INIT_DAY_DATA,
  LOCAL_CACHE_FIELD_NAME,
  SECS_IN_MIN,
} from "shared/constants"
import { DayData, PokoySession, RequestDayData } from "shared/types"
import { roundToSecondDecimalPlace } from "shared/utils/roundToSecondDecimalPlace"

export const createPokoyData = (
  userId: string,
  seconds: number
): PokoySession => {
  const timestamp = new Date().getTime()
  const duration = roundToSecondDecimalPlace(seconds / SECS_IN_MIN)

  return {
    userId,
    timestamp,
    duration,
  }
}

// TODO: solve linter issues
// eslint-disable-next-line max-statements
export const sendSessionFromSeconds = async (
  firestoreDB: Firestore,
  user: User | null | undefined,
  seconds: number
): Promise<DocumentReference<DocumentData> | void> => {
  if (!user) {
    console.error("User is not defined. Request not sended.", "user: ", user)
    return
  }

  const pokoyData = createPokoyData(user.uid, seconds)
  return await sendPokoySessionToServer(firestoreDB, pokoyData)
}

// TODO: add working with several session not just last
export const sendSessionFromLocalStore = async (
  firestoreDB: Firestore,
  user: User | null | undefined,
  LocalPokoyData: PokoySession
): Promise<DocumentReference<DocumentData> | void> => {
  const isSessionLongerThanMinute =
    Number(LocalPokoyData.duration) > SECS_IN_MIN

  if (!isSessionLongerThanMinute || !user) {
    return
  }

  return await sendPokoySessionToServer(firestoreDB, LocalPokoyData)
}

/* eslint-disable-next-line max-statements */
const sendPokoySessionToServer = async (
  firestoreDB: Firestore,
  pokoyData: PokoySession
): Promise<DocumentReference<DocumentData> | void> => {
  const userId = pokoyData.userId
  const daysColRef = collection(firestoreDB, "days")
  const dayTimestamp = Timestamp.fromMillis(pokoyData.timestamp)

  const daysQuery = query(
    daysColRef,
    where("userId", "==", userId),
    where("timestamp", "==", dayTimestamp)
  )

  try {
    const daysQuerySnapshot = await getDocs(daysQuery)

    if (daysQuerySnapshot.empty) {
      await createNewDay(daysColRef, dayTimestamp, pokoyData, userId)
    } else if (!daysQuerySnapshot.empty) {
      await updateExistingDay(daysQuerySnapshot, pokoyData)
    }
  } catch (e) {
    console.error("⛔️", e)
    writeToLocalStore(pokoyData)
  }
}

// TODO: refactor this function
/* eslint-disable-next-line max-statements */
const createNewDay = async (
  daysColRef: CollectionReference<DocumentData>,
  dayTimestamp: Timestamp,
  pokoyData: PokoySession,
  userId: string
) => {
  const newDayRef = doc(daysColRef)
  const dayData = INIT_DAY_DATA

  const statsQuery = query(
    collection(firestore, "stats"),
    where("userId", "==", userId),
    limit(1)
  )
  const userStatsQuerySnapshot = await getDocs(statsQuery)

  if (userStatsQuerySnapshot.empty) {
    console.error("User stats not found")
    return
  }
  const userStatsRef = userStatsQuerySnapshot.docs[0].ref

  const newDayData: RequestDayData = {
    timestamp: dayTimestamp,
    count: dayData.count + 1,
    totalDuration: roundToSecondDecimalPlace(
      dayData.totalDuration + pokoyData.duration
    ),
    meditations: [...dayData.meditations, pokoyData],
    statsRef: userStatsRef,
    userId,
  }

  await setDay(newDayRef, newDayData, pokoyData)
}

/* eslint-disable-next-line max-statements */
const updateExistingDay = async (
  daysQuerySnapshot: QuerySnapshot<DocumentData>,
  pokoyData: PokoySession
) => {
  // TODO: replace hardcode by dynamic code
  const dayDocRef = daysQuerySnapshot.docs[0].ref
  const daySnapshot = await getDoc(dayDocRef)
  const dayData = daySnapshot.data() as RequestDayData

  const totalDuration = dayData?.totalDuration ?? 0
  const meditations = dayData?.meditations ?? []

  const newDayData: RequestDayData = {
    ...dayData,
    count: dayData?.count + 1,
    totalDuration: roundToSecondDecimalPlace(
      totalDuration + pokoyData.duration
    ),
    meditations: [...meditations, pokoyData],
  }

  await setDay(dayDocRef, newDayData, pokoyData)
}

const setDay = async (
  dayRef: DocumentReference<DocumentData>,
  newDayData: RequestDayData,
  pokoyData: PokoySession
) => {
  try {
    await setDoc(dayRef, newDayData)
  } catch (e) {
    console.error("⛔️", e)
    writeToLocalStore(pokoyData)
  }
}

function writeToLocalStore(pokoyData: PokoySession) {
  window?.localStorage.setItem(
    LOCAL_CACHE_FIELD_NAME,
    JSON.stringify(pokoyData)
  )
}
