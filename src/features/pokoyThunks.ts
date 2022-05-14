import { createAsyncThunk } from "@reduxjs/toolkit"
import { User } from "firebase/auth"
import { FEATURE_NAME, setChartData, setStats } from "./pokoySlice"
import { THIRD_PART } from "./user-stats/constants"
import {
  fetchDays,
  fetchStats,
  getForesightChartData as getForesighDaysData,
} from "./user-stats/get-data"
import { getFullRange } from "./user-stats/get-full-range"
import { sliceDaysDataRange } from "./user-stats/utils"

const getStatsActionType = `${FEATURE_NAME}/getStats` as const

export const thunkGetStats = createAsyncThunk(
  getStatsActionType,
  // eslint-disable-next-line max-statements
  async (user: User, thunkAPI) => {
    const statsData = await fetchStats(user)

    if (statsData.firstMeditationDate === null) {
      console.error("there is no first meditation date")
    }

    const setStatsAction = setStats(statsData)
    thunkAPI.dispatch(setStatsAction)
  }
)

const getDaysActionType = `${FEATURE_NAME}/getDays` as const

export const getChartDataThunk = createAsyncThunk(
  getDaysActionType,
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

    const slicedRange = sliceDaysDataRange(daysDataFullRange)
    const additionalDataLength = Math.round(slicedRange.length * THIRD_PART)
    const additionalDaysData = await getForesighDaysData(
      slicedRange,
      user,
      additionalDataLength
    )
    const daysDataWithForesight = [...slicedRange, ...additionalDaysData]
    const setChartDataAction = setChartData(daysDataWithForesight)

    thunkAPI.dispatch(setChartDataAction)
  }
)
