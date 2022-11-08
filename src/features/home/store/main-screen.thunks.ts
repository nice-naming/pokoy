import { User } from "firebase/auth"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { userStatsActions } from "features/user-stats/store/user-stats.slice"
import { setUserStatsThunk } from "features/user-stats/store/user-stats.thunks"
import { serverDayDataToStoreAdapter } from "shared/utils/adapters"
import { AppDispatch, RootState } from "store"
import {
  createSessionData,
  sendMeditationToServer
} from "../components/timer/writeSessionToServer"
import { firestore } from "../firebase-init"
import { FEATURE_NAME } from "../main-screen.constants"
import { Milliseconds } from "shared/types"

type Payload = {
  user: User
  seconds: number
}

type ThunkAPI = {
  state: RootState
  dispatch: AppDispatch
}

export const setMeditationThunk = createAsyncThunk<void, Payload, ThunkAPI>(
  `${FEATURE_NAME}/setMeditation` as const,
  // eslint-disable-next-line max-statements
  async ({ user, seconds }, thunkAPI): Promise<void> => {
    if (!user) {
      console.error("User is not defined. Request not sended.", "user: ", user)
      return
    }

    const sessionData = createSessionData(user.uid, seconds)

    const todayTimestamp = new Date().setHours(0, 0, 0, 0) as Milliseconds
    const isDayDataExists =
      thunkAPI
        .getState()
        .userStats.daysData.findIndex(
          (day) => day.timestamp === todayTimestamp
        ) !== -1

    const serverDayData = await sendMeditationToServer(
      firestore,
      sessionData,
      isDayDataExists
    )

    if (!serverDayData) throw new Error("Request failure")

    const dayData = serverDayDataToStoreAdapter(serverDayData)
    const index = thunkAPI
      .getState()
      .userStats.daysData.findIndex((d) => d.timestamp === dayData.timestamp)

    if (index === -1) {
      thunkAPI.dispatch(userStatsActions.addDay(dayData))
    } else {
      thunkAPI.dispatch(userStatsActions.updateDay({ dayData, index }))
    }

    thunkAPI.dispatch(setUserStatsThunk({ dayData, user }))
  }
)
