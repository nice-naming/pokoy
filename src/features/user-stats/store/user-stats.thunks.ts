import { collection } from "@firebase/firestore"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { User } from "firebase/auth"
import {
  getDocs,
  limit,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore"
import { INIT_SERVER_USER_STATS } from "shared/constants"
import { DayData, ServerUserStatsData } from "shared/types"
import { serverStatsDataToStoreAdapter } from "shared/utils/adapters"
import { roundToHundredth } from "shared/utils/roundToSecondDecimalPlace"
import { firestore } from "../../home/firebase-init"
import { userStatsActions } from "./user-stats.slice"
import { fetchDays, fetchStats } from "../get-data"
import { getFullRange } from "../get-full-range"
import { cutDaysDataRange } from "../utils"
import { FEATURE_NAME } from "../user-stats.constants"

export const getStatsThunk = createAsyncThunk(
  `${FEATURE_NAME}/getStats` as const,
  // eslint-disable-next-line max-statements
  async (user: User, thunkAPI) => {
    try {
      const statsData = await fetchStats(user)
      if (statsData.firstMeditationDate === null) {
        throw new Error("there is no first meditation date")
      }

      const setStatsAction = userStatsActions.setStats(statsData)
      thunkAPI.dispatch(setStatsAction)
    } catch (error) {
      console.error(error)
    }
  }
)

export const getChartDataThunk = createAsyncThunk(
  `${FEATURE_NAME}/getChartData` as const,
  // TODO: refactor this method
  // eslint-disable-next-line max-statements
  async (user: User, thunkAPI) => {
    const daysWithMeditations = await fetchDays(user)
    const shallowDaysWithMeditations = daysWithMeditations.map((d) => ({
      ...d,
      timestamp: d.timestamp.toMillis(),
      statsRef: d.statsRef?.path,
    }))

    const daysDataFullRange = getFullRange(shallowDaysWithMeditations)
    const slicedChartData = cutDaysDataRange(daysDataFullRange)

    const setChartDataAction = userStatsActions.setChartData(slicedChartData)
    thunkAPI.dispatch(setChartDataAction)
  }
)

export const setUserStatsThunk = createAsyncThunk(
  `${FEATURE_NAME}/setUserStats` as const,
  // eslint-disable-next-line max-statements
  async ({ dayData, user }: { dayData: DayData; user: User }, thunkAPI) => {
    const statsColRef = collection(firestore, "stats")
    const q = query(statsColRef, where("userId", "==", user.uid), limit(1))
    const querySnapshot = await getDocs(q)

    const userStatsRef = querySnapshot.docs[0].ref
    const userStatsData = querySnapshot.docs[0].data() as ServerUserStatsData

    const { totalDuration, count, firstMeditationDate } =
      userStatsData || INIT_SERVER_USER_STATS

    const newUserStats: ServerUserStatsData = {
      count: count + 1,
      userId: dayData.userId,
      // TODO: add cloud function to recalculate total duration
      totalDuration: roundToHundredth(totalDuration + dayData.totalDuration),
      firstMeditationDate:
        firstMeditationDate || Timestamp.fromMillis(dayData.timestamp),
    }

    try {
      await setDoc(userStatsRef, newUserStats)
      const newUserStatsState = serverStatsDataToStoreAdapter(newUserStats)

      thunkAPI.dispatch(userStatsActions.setStats(newUserStatsState))
      console.info("SUCCESS")
    } catch (e) {
      console.error("ERROR: ", e)
    }
  }
)
